import { postAlzarHadoopDirecto, postGuardarDocumento } from '../../../api/apmDesaApi';
import { base64ToFile } from '../../../helpers/base64ToFile';
import { EtiquetaVariableResponse, GuardarDocumentoRequest, EtiquetaVariableBody } from '../../../interfaces/interfaces';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { hadoopDirecto } from '../../../redux/slices/hadoop.slice';

export const useDocumento = () => {

    const etiquetaVariableBody = useSelector((state: RootState) => state.etiquetaVariable.etiquetaVariableBody);
    const clienteDatos = useSelector((state: RootState) => state.clienteDatos.items);
    const numeroLegajo = useSelector((state: RootState) => state.guardarDocumento.response);
    const hadoop = useSelector((state: RootState) => state.hadoopDirecto.response);
    const saveDoc = useSelector((state: RootState) => state.guardarDocumento.response);
    const saveDate = useSelector((state: RootState) => state.guardarDocumento.response);


    const guardarDocumento = async (item: EtiquetaVariableResponse) => {
        const file = await base64ToFile(item?.base64Modified ?? "", "test")  

        const formData = new FormData();        
        formData.append("file", file);

        const resHadoop = await postAlzarHadoopDirecto(formData, "", false, 255);
        console.log(resHadoop)

        const body: GuardarDocumentoRequest = {
            // codigoTipoDocumento:Number(etiquetas),
            codigoTipoDocumento: 1214,
            // rutaDocumento:"/datalake/Continental/Esquema.pdf",
            // rutaDocumento: String(hadoop.LOC),
            rutaDocumento: String(hadoop.LOC),
            fechaEmision: new Date(saveDate.fechaEmision),
            descripcionDocumento:"Esquema",
            codigoCliente: clienteDatos.codigoCliente,
            // codigoLegajo:Number(numeroLegajo),
            codigoLegajo: numeroLegajo.codigoLegajo,
            hadoop:"1010", //Identificador de elementos insertados desde el frontEnd
            // hadoopPath:"/datalake/Continental/Esquema.pdf",
            // hadoopPath:String(hadoop.LOC),
            hadoopPath: String(hadoop.LOC),
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