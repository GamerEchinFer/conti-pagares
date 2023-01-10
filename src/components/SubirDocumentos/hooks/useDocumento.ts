import { useSelector } from 'react-redux';
import { postAlzarHadoopDirecto, postGuardarDocumento } from '../../../api/apmDesaApi';
import { base64ToFile } from '../../../helpers/base64ToFile';
import { EtiquetaVariableResponse, GuardarDocumentoRequest } from '../../../interfaces/interfaces';
import { RootState } from '../../../redux/store';
import { postEtiquetasVariablesAction } from '../../../redux/thunks/etiqueta.thunk';
import { etiquetaVariable } from '../../../redux/slices/etiquetaVariable.slice';
import { useEffect, useState } from 'react';


export const useDocumento = () => {

    const etiquetaVariableBody = useSelector((state: RootState) => state.etiquetaVariable.etiquetaVariableBody);
    const clienteDatos = useSelector((state: RootState) => state.clienteDatos.items);
    const numeroDeLegajo = useSelector((state: RootState) => state.numeroLegajo.items);    
    const saveDoc = useSelector((state: RootState) => state.guardarDocumento.response);

    const [body, setBody] = useState<any>({});
    useEffect(() => {
        const jsonString = localStorage.getItem("etiqueta-variable-body");             
          if (jsonString) {
            const data = JSON.parse(jsonString)
            setBody(data)
            body.id_producto.valor,
            body.id_subproducto.valor,
            body.id_actividad.valor,
            body.id_riesgo.valor,
            body.codigoCliente.valor,
            body.tipoPersona.valor
        }
    }, []);

    const guardarDocumento = async (item: EtiquetaVariableResponse) => {
        const file = await base64ToFile(item?.base64Modified ?? "", "test");  
        const formData = new FormData();        
        formData.append("file", file);
        const resHadoop = await postAlzarHadoopDirecto(formData, "", false, 255);
        console.log(resHadoop);     
        
        const body: GuardarDocumentoRequest = {
            // codigoTipoDocumento:Number(etiquetas),
            codigoTipoDocumento: 6654,
            rutaDocumento: resHadoop.LOC,
            fechaEmision: "09012023",
            descripcionDocumento: item.filename,
            codigoCliente: clienteDatos.codigoCliente,
            codigoLegajo: numeroDeLegajo[0].nextSequence,
            hadoop:resHadoop.LOC,           
            hadoopPath: resHadoop.LOC,
            codigoUsuario:"PER",
            codigoProducto: Number(etiquetaVariableBody?.id_producto.valor ?? "0") ,
            codigoSubproducto: Number(etiquetaVariableBody?.id_subproducto.valor ?? "0"),
            operacion: Number(saveDoc.operacion)
        }

        const res = await postGuardarDocumento(body)
        return res
    }

    return {guardarDocumento}
}