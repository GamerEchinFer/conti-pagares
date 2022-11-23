
import { AxiosResponse } from 'axios';
import { apiKey, baseUrl } from '../constants/constants';
import { DatosCliente, EtiquetaVariable, EtiquetaVariableResponse, Parametros, ParametrosVisibleLista, ParametrosVisibles, PeriodicidadTipoDocumento, Producto, SolicitudCliente, SubProducto, TipoBusqueda } from '../interfaces/interfaces';

import { api, continentalApi } from './index';

export async function apiGDI() {    
    const solicitud = await api.get(`/solicitudCliente`);        
    const busqueda = await api.get(`/tipoBusqueda`);        
    const datosCliente = await api.get(`/datosCliente`);          
    
    return {
        solicitud: solicitud.data,
        busqueda: busqueda.data,
        datosCliente: datosCliente.data,               
    }
}
// Método utilizado para filtrar los elementos utilizando id enfocado a SolicitudCliente
export async function getSolicitudClienteById(id: number) {    
    const solicitudURL = `${baseUrl}/solicitudCliente/${id}`;
    const solicitud = await api.get<SolicitudCliente>(solicitudURL);
    return solicitud
}

// Método utilizado para filtrar los elementos a través de id enfocado a TipoBusqueda
export async function getTipoBusquedaById(id: number) {    
    const URL = `${baseUrl}/tipoBusqueda/${id}`;
    const response = await api.get<TipoBusqueda>(URL);
    return response
}

// Para comunicar los seguimientos de todas las solicitudes: item 1 al 4 APIJSON solicitudCliente
export async function getAllSolicitudCliente() {    
    const solicitudURL = `${baseUrl}/solicitudCliente`;
    const solicitud = await api.get<SolicitudCliente[]>(solicitudURL);
    return solicitud
}

//Para comunicar en función a la dirección de datos desde la APIJSON DatosCliente
export async function getDatosCliente() {    
    const datosClienteURL = `${baseUrl}/datosCliente`;
    const datosCliente = await api.get<DatosCliente[]>(datosClienteURL);
    return datosCliente
}

//Para comunicar en funcion a la dirección de datos desde la APIJSON TipoBusqueda
export async function getTipoBusqueda() {    
    const tipoBusquedaURL = `${baseUrl}/tipoBusqueda`;
    const tipoBusqueda = await api.get<TipoBusqueda[]>(tipoBusquedaURL);
    return tipoBusqueda
}

//Para comunicar en funcion a la dirección de datos desde ContinentalAPI Producto
// export async function getProductos() {    
    // const productoURL = `/gestion-documental/productos`;
    // TODO - LEER HEADERS, ENCABEZADO DE SOLICITUD
    // const producto = await continentalApi.get<Producto[]>(productoURL, {
    //     headers: {
    //         "x-api-key": apiKey
    //     }
    // });
    // return producto
// }

//Para comunicar en funcion a la dirección de datos desde la APIGDI SubProducto
// export async function getSubProductos(idProducto: number) {    
//     const subProductoURL = `/gestion-documental/subproductos`;
//     const subProducto = await continentalApi.get<SubProducto[]>(subProductoURL , {
//         params: {idProducto},
//         headers: {
//             "x-api-key": apiKey
//         }
//     });
//     return subProducto
// }

//Para comunicar en funcion a la dirección de datos desde la APIGDI Parametros Visibles
// export async function getParametrosVisibles(idProducto: number, idSubProducto: number) {    
//     const parametrosVisiblesURL = `/gestion-documental/parametros-visibles`;
//     const parametrosVisibles = await continentalApi.get<ParametrosVisibles[]>(parametrosVisiblesURL, {
//         params: {idProducto, idSubProducto},
//         headers: {
//             "x-api-key": apiKey
//         }
//     });
//     return parametrosVisibles
//}

//Para comunicar en funcion a la dirección de datos desde la APIGDI Parametros
// export async function getParametros(tipo: string) {    
//     const parametrosURL = `/gestion-documental/parametros`;
//     const parametros = await continentalApi.get<Parametros[]>(parametrosURL, {
//         params: {tipo},
//         headers: {
//             "x-api-key": apiKey
//         }
//     });
//     return parametros
// }

//Para comunicar en funcion a la dirección de datos desde la APIGDI ParametrosVisibleLista
// export async function getParametrosVisibleLista(tipoParametro: string) {    
//     const parametrosVisibleListaURL = `/gestion-documental/parametros-visible-lista`;
//     const parametrosVisibleLista = await continentalApi.get<ParametrosVisibleLista[]>(parametrosVisibleListaURL, {
//         params: {tipoParametro},
//         headers: {
//             "x-api-key": apiKey
//         }
//     });
//     return parametrosVisibleLista
// }



//Para comunicar en funcion a la dirección de datos desde la APIGDI EtiquetaVariable
// export const postEtiquetaVariable = async (body: EtiquetaVariable[]) => {
//     const etiquetaURL =  `/gestion-documental/etiquetas-variables-periodicidad`;
//     const {data} = await continentalApi.post<EtiquetaVariable[], AxiosResponse<EtiquetaVariableResponse[]>>(etiquetaURL, body,{headers: { "x-api-key": apiKey }});
//     return data;
// }

//Para comunicar en funcion a la dirección de datos desde la APIGDI Periodicidad Tipo Documento
// export async function getPeriodicidad(idTipoDocumento: number) {    
//     const periodicidadURL = `/gestion-documental/periodicidad-tipo-documento`;
//     const periodicidad = await continentalApi.get<PeriodicidadTipoDocumento[]>(periodicidadURL, {
//         params: {idTipoDocumento},
//         headers: {
//             "x-api-key": apiKey
//         }
//     });
//     return periodicidad;
// }