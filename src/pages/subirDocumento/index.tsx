import { Box } from "@mui/material";
import { useMount, useUnmount } from 'ahooks';
import * as pdfjsLib from 'pdf-lib';
import { DragEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postGuardarHistorialUsuario } from "../../api/apmDesaApi";
import BackButton from "../../components/Buttons/BackButton";
import ButtonFinalizar from "../../components/Buttons/ButtonFinalizar";
import AddIconComponent from "../../components/SubirDocumentos/AddIconComponent";
import DocumentListComponent from "../../components/SubirDocumentos/DocumentListComponent";
import DragDropComponent from "../../components/SubirDocumentos/DragDropComponent";
import HeaderDocComponent from "../../components/SubirDocumentos/HeaderDocComponent";
import ModalAddDocument from "../../components/SubirDocumentos/ModalAddDocument";
import { SubirDocumentoProvider } from '../../context/subirDocumento/SubirDocumentoProvider';
import { storage } from "../../helpers/storage";
import { Condiciones, EtiquetaVariableBody, EtiquetaVariableResponse, GuardarHistorialUsuarioRequest, Parametros } from '../../interfaces/interfaces';
import { etiquetaVariableActions } from '../../redux/slices/etiquetaVariable.slice';
import { hadoopDirectoActions } from '../../redux/slices/hadoop.slice';
import { parametroActions } from "../../redux/slices/parametro.slice";
import { RootState } from "../../redux/store";
import { getSolicitudClienteAction } from "../../redux/thunks/solicitud.thunks";
import { postEtiquetasVariablesAction } from "../../redux/thunks/etiqueta.thunk";
import CargaExitosaComponent from "../../components/SubirDocumentos/CargaExitosaComponent";
import {useRouter} from 'next/router';

const SubirDocumentoPage = ()  => {

    const router = useRouter();

    const dispatch = useDispatch();
    
    const files = useSelector((state: RootState) => state.hadoopDirecto.files);
    const etiquetasVariables = useSelector((state: RootState) => state.etiquetaVariable.response);    
    const etiquetasLoading = useSelector((state: RootState) => state.etiquetaVariable.loading);    
    const clienteDatos = useSelector((state: RootState) => state.clienteDatos.items);
    const page = useSelector((state: RootState) => state.etiquetaVariable.page);

    const [openAddModal, setOpenAddModal] = useState(false);
    const [openModalFinalizacion, setOpenModalFinalizacion] = useState(false);
    const [etiquetaVariableBody, setEtiquetaVariableBody] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false)
    const [body, setBody] = useState<any>({});
    const [onclose, setOnclose] = useState("");

    useMount(() => {
        const data = storage.getObject("etiquetas-variable-body")
        setBody(data)                    
    })            

    useMount(() => {
        const data = storage.getObject("etiquetas-variable-body")
        setEtiquetaVariableBody(data)                    
    })  

    useMount(() => {                
        hadoopDirectoActions.setFiles(null);
    })

    useUnmount(() => {
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
    }

    const refreshEtiquetasVariables = () => {
        dispatch(postEtiquetasVariablesAction(Object.values(body)));
    }
         
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
        const docTotal = etiquetasVariables?.length ?? 0
        const docActual = etiquetasVariables?.filter(item => item.tieneDocumento).length ?? 0
        let estadoActual = 0
        if(docTotal === docActual) { estadoActual = 1 }
        const body: GuardarHistorialUsuarioRequest = {
            codigoCliente: clienteDatos.codigoCliente,
            estado: estadoActual,
            cantidadTotalDocumentos: etiquetasVariables?.length ?? 0,
            cantidadDocumentosIngresados: etiquetasVariables?.filter(item => item.tieneDocumento).length ?? 0,        
            usuario: 'PER',
            condiciones: mapCondiciones(etiquetaVariableBody as EtiquetaVariableBody)
        } 

        setLoading(true)
        try {                            
              await postGuardarHistorialUsuario(body);
                setOpenModalFinalizacion(true);
                setLoading(false);
                setSuccess(true);
        } catch (error) {
            console.log(error)
            setLoading(false)
            setSuccess(false)
        }        

    };

    const handleClickAdd = () => {
        setOpenAddModal(true);
    };

    const closeModal= () => {
        setOpenModalFinalizacion(false);
    }

    const onDrop = (event: DragEvent<HTMLDivElement>, {idTipoDocumento, periodicidad, tieneDocumento}: EtiquetaVariableResponse) => {

        if (tieneDocumento) return;
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
        setOpenAddModal(false);
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
                                    <DocumentListComponent item={item} refresh={refreshEtiquetasVariables} />
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
                    <ButtonFinalizar onClick={handleClickCargar} />
                </div>
                </Box>
            </Box>
            <ModalAddDocument open={openAddModal} onClose={handleCloseAddModal} />
            <CargaExitosaComponent open={openModalFinalizacion} onClose={closeModal} />

        </SubirDocumentoProvider>
    )
}

export default SubirDocumentoPage
