import { useMount } from 'ahooks';
import { Console } from 'console';
import moment from 'moment';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postAlzarHadoopDirecto, postGuardarDocumento } from '../../../api/apmDesaApi';
import { base64ToFile } from '../../../helpers/base64ToFile';
import { storage } from '../../../helpers/storage';
import { EtiquetaVariableResponse, GuardarDocumentoRequest } from '../../../interfaces/interfaces';
import { RootState } from '../../../redux/store';


export const useDocumento = () => {
    const dispatch = useDispatch();
    const etiquetaVariableBody = useSelector((state: RootState) => state.etiquetaVariable.etiquetaVariableBody);
    const clienteDatos = useSelector((state: RootState) => state.clienteDatos.items);
    const numeroDeLegajo = useSelector((state: RootState) => state.numeroLegajo.items);    
    const saveDoc = useSelector((state: RootState) => state.guardarDocumento.response);

    const [body, setBody] = useState<any>({});

    useMount(() => {
        const data = storage.getObject("etiquetas-variable-body")
        setBody(data)                    
    })    

    const guardarDocumento = async (item: EtiquetaVariableResponse, fechaEmision: any) => {
        const file = await base64ToFile(item?.base64Modified ?? "", "test");  
        const formData = new FormData();        
        formData.append("file", file);
        const resHadoop = await postAlzarHadoopDirecto(formData, "/datalake/Continental-desa", false, 65356);        
        

        let newFech = moment(fechaEmision).format('DDMMYYYY');

        const LOC = resHadoop?.loc ?? ""

        

        const dataForPost: GuardarDocumentoRequest = {
            codigoTipoDocumento: Number(item.idTipoDocumento),
            rutaDocumento: LOC,
            fechaEmision: newFech,
            descripcionDocumento: item.filename,
            codigoCliente: clienteDatos.codigoCliente,
            codigoLegajo: numeroDeLegajo[0].nextSequence,
            hadoop:LOC,           
            hadoopPath: LOC,
            codigoUsuario:"PER",
            // codigoProducto: Number(etiquetaVariableBody?.id_producto.valor ?? "0") , // no reconoce
            codigoProducto: Number(body?.id_producto.valor ?? "0") , // no reconoce
            // codigoProducto: Number(10),
            // codigoSubproducto: Number(etiquetaVariableBody?.id_subproducto.valor ?? "0"), // no reconoce
            codigoSubproducto: Number(body?.id_subproducto.valor ?? "0"),
            operacion: Number(1393939)
        }    
        
        

        const res = await postGuardarDocumento(dataForPost)
        return res
    }

    return {guardarDocumento}
}