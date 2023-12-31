import { clienteDatos } from "./slices/clienteDatos.slice";
import { datosCliente } from "./slices/datosCliente.slice";
import { etiquetaVariable } from "./slices/etiquetaVariable.slice";
import { hadoopDirecto } from "./slices/hadoop.slice";
import { hadoopDownload } from "./slices/hadoopDownload.slice";
import { parametro } from "./slices/parametro.slice";
import { parametroVisible } from "./slices/parametroVisible.slice";
import { producto } from "./slices/producto.slice";
import { solicitud } from "./slices/solicitud.slice";
import { subProducto } from "./slices/subProducto.slice";
import { guardarDocumento } from "./slices/guardarDocumento.slice";
import { clienteDocumento } from './slices/clienteDocumento.slice';
import { numeroLegajo } from "./slices/numeroLegajo.slice";
import { tipoDocumento } from "./slices/tipoDocumento.slice";
import { busqueda } from "./slices/busqueda.slice";
import { documentosUser } from './slices/documentosUser.slice';
import { documentosUserFiltro } from './slices/documentosUserFiltro';
import { tipoDocumentoHistorico } from "./slices/documentoHistorico.slice";
import { promissoryNotesDelivery } from './slices/delivery.slice';

const reducer = {
    solicitud,
    producto,
    subProducto,
    datosCliente,
    parametroVisible,
    parametro,
    etiquetaVariable,
    hadoopDirecto,
    hadoopDownload,
    clienteDatos,
    guardarDocumento,
    clienteDocumento,
    numeroLegajo,
    tipoDocumento,
    busqueda,
    documentosUser,
    documentosUserFiltro,
    tipoDocumentoHistorico,   
    promissoryNotesdelivery: promissoryNotesDelivery 
}

export default reducer;