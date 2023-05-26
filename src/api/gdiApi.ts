import { baseUrl } from '../constants/constants';
import { DatosCliente, SolicitudCliente, TipoBusqueda } from '../interfaces/interfaces';

import { api} from './index';

export async function getSolicitudClienteById(id: number) {    
    const solicitudURL = `${baseUrl}/solicitudCliente/${id}`;
    const solicitud = await api.get<SolicitudCliente>(solicitudURL);
    return solicitud
}

export async function getTipoBusquedaById(id: number) {    
    const URL = `${baseUrl}/tipoBusqueda/${id}`;
    const response = await api.get<TipoBusqueda>(URL);
    return response
}

export async function getAllSolicitudCliente() {    
    const solicitudURL = `${baseUrl}/solicitudCliente`;
    const solicitud = await api.get<SolicitudCliente[]>(solicitudURL);
    return solicitud
}

export async function getDatosCliente() {    
    const datosClienteURL = `${baseUrl}/datosCliente`;
    const datosCliente = await api.get<DatosCliente[]>(datosClienteURL);
    return datosCliente
}

export async function getTipoBusqueda() {    
    const tipoBusquedaURL = `${baseUrl}/tipoBusqueda`;
    const tipoBusqueda = await api.get<TipoBusqueda[]>(tipoBusquedaURL);
    return tipoBusqueda
}
