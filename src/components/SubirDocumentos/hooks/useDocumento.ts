import { useMount } from 'ahooks';
import moment from 'moment';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { postGuardarDocumento, postSubirMsFileStream } from '../../../api/apmDesaApi';
import { base64ToFile } from '../../../helpers/base64ToFile';
import { storage } from '../../../helpers/storage';
import { EtiquetaVariableResponse, GuardarDocumentoRequest } from '../../../interfaces/interfaces';
import { RootState } from '../../../redux/store';

export const useDocumento = () => {
    const clienteDatos = useSelector((state: RootState) => state.clienteDatos.items);
    const usuarios = useSelector((state: RootState) => state.auth.datosAgente);
    const numeroDeLegajo = useSelector((state: RootState) => state.numeroLegajo.items);    
    const msFileStreamData = useSelector((state: RootState) => state.msFileStream.response);
    const [body, setBody] = useState<any>({});

    useMount(() => {
        const data = storage.getObject("etiquetas-variable-body")
        setBody(data)                    
    })    

    const guardarDocumento = async (item: EtiquetaVariableResponse, fechaEmision: any, operacion: string) => {
        const file = await base64ToFile(item?.base64Modified ?? "", item.filename);    
        const pathName = process.env.NEXT_PUBLIC_PATH_NAME ?? "" 
        const formData = new FormData();        
        formData.append("file", file);
        formData.append("pathName", pathName);
        const resMsFileStream = await postSubirMsFileStream(formData);
        
        let newFech = moment(fechaEmision).format('DDMMYYYY');
        
        const msFileStreamPath = resMsFileStream?.pathArchivo ?? ""
        
        const dataForPost: GuardarDocumentoRequest = {
            codigoTipoDocumento: Number(item.idTipoDocumento),
            rutaDocumento: msFileStreamPath,
            fechaEmision: newFech,
            descripcionDocumento: item.filename,
            codigoCliente: clienteDatos.codigoCliente,
            codigoLegajo: numeroDeLegajo[0].nextSequence,
            hadoop: msFileStreamPath,           
            hadoopPath: msFileStreamPath,
            codigoUsuario: usuarios?.codigo ?? "",
            codigoProducto: Number(body?.id_producto.valor ?? "0") ,
            codigoSubproducto: Number(body?.id_subproducto.valor ?? "0"),
            operacion: operacion
        }
        const res = await postGuardarDocumento(dataForPost)
        return res
    }

    return {guardarDocumento}
}