import { datosCliente } from "./slices/datosCliente.slice";
import { etiquetaVariable } from "./slices/etiquetaVariable.slice";
import { hadoopDirecto } from "./slices/hadoop.slice";
import { hadoopDownload } from "./slices/hadoopDownload.slice";
import { parametro } from "./slices/parametro.slice";
import { parametroVisible } from "./slices/parametroVisible.slice";
import { producto } from "./slices/producto.slice";
import { solicitud } from "./slices/solicitud.slice";
import { subProducto } from "./slices/subProducto.slice";
const reducer = {
    solicitud,
    producto : producto,
    subProducto: subProducto,
    datosCliente: datosCliente,
    parametroVisible,
    parametro: parametro,
    etiquetaVariable,
    hadoopDirecto,
    hadoopDownload
}

export default reducer;