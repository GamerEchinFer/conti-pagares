import { useRouter } from "next/router";
import { useSelector, useDispatch } from 'react-redux';
import BackButton from "../../components/Buttons/BackButton";
import AddIconComponent from "../../components/SubirDocumentos/AddIconComponent";
import DocumentListComponent from "../../components/SubirDocumentos/DocumentListComponent";
import DragDropComponent from "../../components/SubirDocumentos/DragDropComponent";
import HeaderDocComponent from "../../components/SubirDocumentos/HeaderDocComponent";
import { RootState } from "../../redux/store";
import { DragEvent, useState } from 'react';
import { etiquetaVariableActions } from '../../redux/slices/etiquetaVariable.slice';
import { useUnmount, useMount } from 'ahooks';
import ButtonFinalizar from "../../components/Buttons/ButtonFinalizar";
import { Condiciones, EtiquetaVariableBody, EtiquetaVariableResponse, GuardarHistorialUsuarioRequest, Parametros } from '../../interfaces/interfaces';
import { hadoopDirectoActions } from '../../redux/slices/hadoop.slice';
import { SubirDocumentoProvider } from '../../context/subirDocumento/SubirDocumentoProvider';
import * as pdfjsLib from 'pdf-lib'
import { Box } from "@mui/material";
import { parametroActions } from "../../redux/slices/parametro.slice";
import { getSolicitudClienteAction } from "../../redux/thunks/solicitud.thunks";
import ModalAddDocument from "../../components/SubirDocumentos/ModalAddDocument";
import { postGuardarHistorialUsuario } from "../../api/apmDesaApi";
import { storage } from "../../helpers/storage";

const SubirDocumentoPage = ()  => {

    const router = useRouter();

    const dispatch = useDispatch();

    const etiquetasVariables = useSelector((state: RootState) => state.etiquetaVariable.response);    
    const clienteDatos = useSelector((state: RootState) => state.clienteDatos.items);
    const page = useSelector((state: RootState) => state.etiquetaVariable.page);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [etiquetaVariableBody, setEtiquetaVariableBody] = useState<any>({});



    // The Files of redux but cant use in others components
    const files = useSelector((state: RootState) => state.hadoopDirecto.files);

    useMount(() => {
        const data = storage.getObject("etiquetas-variable-body")
        setEtiquetaVariableBody(data)                    
    })  

    useMount(() => {                
        hadoopDirectoActions.setFiles(null);
    })

    useUnmount(() => {
        // With redux clear in all modals = false
        dispatch(etiquetaVariableActions.etiquetaVariableCloseAllModals());
    });

    const initialize = () => {
        if(page === -1){
            setSolicitud(null);
        }    
        dispatch(getSolicitudClienteAction());
    }

    const setPage = (value: number) => {
        dispatch(etiquetaVariableActions.setPage(value));
    }
    
    const setSolicitud = (value: Parametros | null) => {
        dispatch(parametroActions.parametroRequest());
    }
    
    const handleClickAtras = () => {
        if (page === -1) {
            router.push('/solicitud');
            dispatch(etiquetaVariableActions.etiquetaVariableReset());
        }
    }; 

    /*
        {
            "id_producto": {
                "nombre": "id_producto",
                "valor": "10"
            },
            "id_subproducto": {
                "nombre": "id_subproducto",
                "valor": "10"
            },
        }        
    */           
    const mapCondiciones = (body: EtiquetaVariableBody): Condiciones[] => Object.values(body).map(
        item => ({            
                nombreCondicion: item.nombre,
                valorCondicion: item.valor
            }) as Condiciones
        ).filter(item => item.nombreCondicion !== "codigoCliente" && item.nombreCondicion !== "tipo_persona") 
    

    const handleClickCargar = async () => {

        if (!etiquetaVariableBody) {
            return;
        }

        // Preparar request
        const body: GuardarHistorialUsuarioRequest = {
            codigoCliente: clienteDatos.codigoCliente,
            estado: 0,
            cantidadTotalDocumentos: etiquetasVariables?.length ?? 0,
            cantidadDocumentosIngresados: etiquetasVariables?.filter(item => item.tieneDocumento).length ?? 0,        
            usuario: 'PER',
            condiciones: mapCondiciones(etiquetaVariableBody as EtiquetaVariableBody)
        } 

        // Llamar a la api      
        try {                            
            await postGuardarHistorialUsuario(body)    
            // Resolver la respuesta            
            // router.push("/tipoBusqueda");            
            
        } catch (error) {
            console.log(error)
        }        

    };

    /// En caso de necesitar subir más documentos, insertar lista
    const handleClickAdd = () => {
        setOpenAddModal(true)
    };

    const onDrop = (event: DragEvent<HTMLDivElement>, {idTipoDocumento, periodicidad, tieneDocumento}: EtiquetaVariableResponse) => {

        if (tieneDocumento) return;
        // Comprobar el tipo de dato de una variable
        // console.log(typeof file);       
        // console.log(typeof file === "string")
        const idx = event.dataTransfer.getData("file");         

        const reader = new FileReader();
        reader.readAsDataURL(files[Number(idx)]);

        reader.onload = function () {

            pdfjsLib.PDFDocument.load( reader.result?.toString() ?? "").then((pdfDoc) => {
                console.log(files[Number(idx)].size)
                dispatch(etiquetaVariableActions.etiquetaVariableUpdateFile({
                    idTipoDocumento, 
                    file: files[Number(idx)], 
                    base64: reader.result?.toString() ?? "",
                    base64Modified: reader.result?.toString() ?? "", 
                    totalPages: pdfDoc.getPageCount(),
                    size: files[Number(idx)].size / 1000000,
                }));
            })                                         
        }
    }

    const allowDrop = (event: any) => {
        event.preventDefault();
    }

    const handleCloseAddModal = () => {
        setOpenAddModal(false)
    }

    return (
        <SubirDocumentoProvider>
            <Box sx={{ width: "75%"}}>
                <HeaderDocComponent />                
                <Box sx={{ width: "125%"}}>
                <div className="grid grid-cols-2 gap-6 md:max-w-5xl m-auto" >
                    <div className="overflow-auto h-96">
                        {
                            etiquetasVariables.map(item => (
                            <div key={item.idTipoDocumento} className="flex flex-col" onDrop={(event) => onDrop(event, item)} onDragOver={allowDrop}>
                                <div className="pt-2">
                                    <DocumentListComponent item={item} /> 
                                </div>
                            </div>
                            ))
                        }
                        <div className="flex justify-center">
                            <AddIconComponent  onClick={handleClickAdd} />
                        </div>
                    </div>
                    <div className="dragDropComponent">    
                        <DragDropComponent />
                    </div>
                </div>
                <div className="flex flex-row justify-center gap-8 pb-4">
                    <BackButton  onClick={handleClickAtras} />
                    <ButtonFinalizar onClick={handleClickCargar}/>
                </div>
                </Box>
            </Box>
            <ModalAddDocument open={openAddModal} onClose={handleCloseAddModal} />
        </SubirDocumentoProvider>
    )
}

export default SubirDocumentoPage
