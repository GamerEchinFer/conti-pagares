
import { baseUrl } from '../constants/constants';
import { DatosCliente, SolicitudCliente, TipoBusqueda } from '../interfaces/interfaces';

import { api} from './index';

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
