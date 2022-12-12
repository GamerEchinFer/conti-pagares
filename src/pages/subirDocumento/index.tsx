import { useRouter } from "next/router";
import { useSelector, useDispatch } from 'react-redux';
import BackButton from "../../components/Buttons/BackButton";
import AddIconComponent from "../../components/SubirDocumentos/AddIconComponent";
import DocumentListComponent from "../../components/SubirDocumentos/DocumentListComponent";
import DragDropComponent from "../../components/SubirDocumentos/DragDropComponent";
import HeaderDocComponent from "../../components/SubirDocumentos/HeaderDocComponent";
import { RootState } from "../../redux/store";
import { DragEvent, useEffect } from 'react';
import { etiquetaVariableActions } from '../../redux/slices/etiquetaVariable.slice';
import { useUnmount, useMount } from 'ahooks';
import ButtonFinalizar from "../../components/Buttons/ButtonFinalizar";
import { EtiquetaVariableResponse } from '../../interfaces/interfaces';
import { hadoopDirectoActions } from '../../redux/slices/hadoop.slice';
import { SubirDocumentoProvider } from '../../context/subirDocumento/SubirDocumentoProvider';

const SubirDocumentoPage = ()  => {

    const router = useRouter();

    const dispatch = useDispatch();
    const etiquetasVariables = useSelector((state: RootState) => state.etiquetaVariable.response);

    // Los files viene de redux tambien para usar en otras partes
    const files = useSelector((state: RootState) => state.hadoopDirecto.files);


    useMount(() => {                
        hadoopDirectoActions.setFiles(null)
    })

    useUnmount(() => {
        // With redux clear in all modals = false
        dispatch(etiquetaVariableActions.etiquetaVariableCloseAllModals());
    });


    const handleClickAtras = () => {
        router.push("/solicitud");
    };

    const handleClickCargar = () => {
        console.log("cargando...");
        // router.push("/subirDocumentos");
    };

    /// En caso de necesitar subir más documentos, insertar lista
    const handleClickAdd = () => {
        router.push("/addDocumentList");
    };

    const onDrop = (event: DragEvent<HTMLDivElement>, {idTipoDocumento, periodicidad}: EtiquetaVariableResponse) => {
        console.log(event);
        
        const idx = event.dataTransfer.getData("file")        
        // Comprobar el tipo de dato de una variable
        // console.log(typeof file);       
        // console.log(typeof file === "string")
        console.log(files[Number(idx)]);    

        const reader = new FileReader();
        reader.readAsDataURL(files[Number(idx)]);

        reader.onload = function () {
            dispatch(etiquetaVariableActions.etiquetaVariableUpdateFile({
                idTipoDocumento, 
                file: files[Number(idx)], 
                base64: reader.result?.toString() ?? "",
            }));
            
            
            if (periodicidad === 6) {

            }            
        }
    }

    const allowDrop = (event: any) => {
        event.preventDefault();
    }

    return (
        <SubirDocumentoProvider>

            <HeaderDocComponent />
            <div className="grid grid-cols-2 gap-6 md:max-w-3xl m-auto" >
                <div className="overflow-auto h-96">
                    {
                    etiquetasVariables.map(item => (
                        <div key={item.idTipoDocumento} className="flex justify-start" onDrop={(event) => onDrop(event, item)} onDragOver={allowDrop}>
                            <div className="pt-2">
                                <DocumentListComponent item={item} /> 
                            </div>
                        </div>
                    ))
                    }
                    {/* Añadir listado de documentos */}
                    <div className="flex justify-center">
                        <AddIconComponent  onClick={handleClickAdd} />
                    </div>
                </div>
                {/* <div className="border-dashed border-2 border-[#1D428A] w-80 h-96 ..."> */}
                <div>    
                    <DragDropComponent />
                </div>
            </div>
            <div className="flex flex-row justify-center gap-8 pb-4">
                <BackButton  onClick={handleClickAtras} />
                <ButtonFinalizar onClick={handleClickCargar}/>
            </div>
        </SubirDocumentoProvider>
    )
}

export default SubirDocumentoPage
