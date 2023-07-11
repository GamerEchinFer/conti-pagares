import axios from "axios";
import { ConfigApiInterna } from "../config/config";
import { DatosAgenteResponse, IpGeolocationResponse, LoginResponse, PermisosUsuarioResponse } from "../models/responses";

const { auth } = ConfigApiInterna;

export const apiTokenInterna = async () => {
    const datosToken = await axios.post<LoginResponse>(auth.token);
    if (datosToken){
        if (datosToken.status === 204) {
            return null;
        }
        if (datosToken.status >= 400) {
            return null ;
        }
        return datosToken.data;
    }
    return null 
}

export const apiDatosAgenteInterna = async (token:string,usuario:string) => {
    const datosAgente = await axios.post<DatosAgenteResponse>(auth.datosAgente, {data: {token:token, usuario:usuario}});
    if (datosAgente){
        if (datosAgente.status === 204) {
            return null;
        }
        if (datosAgente.status >= 400) {
            return null ;
        }
        return datosAgente.data;
    }
    return null 
}

export const apiPermisosUsuarioInterna = async (token:string, userCarga:string) => {
    const permisosUsuario = await axios.post<PermisosUsuarioResponse[]>(auth.permisosUsuario, {data: {token:token, userCarga:userCarga}});
    if (permisosUsuario){
        if (permisosUsuario.status === 204) {
            return null;
        }
        if (permisosUsuario.status >= 400) {
            return null ;
        }
        return permisosUsuario.data;
    }
    return null 
}

export const apiIpGeolocation = async () => {
    return await axios.get<IpGeolocationResponse>(auth.ipGeolocation).then(
        (response) => {
            if (response.status >= 400) {
                return null;
            } else {
                return response.data;
            }
        }
    ).catch(
        (error) => {
            return null;
        }
    );
}
