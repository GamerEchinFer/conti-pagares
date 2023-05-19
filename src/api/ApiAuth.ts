import axios from "axios";
import AppConfig from "../config/config";
import { bearer, defaultheaders } from "../helpers/headers";
import { ClienteDatos } from "../interfaces/interfaces";
import AsignarMarcaPLA from "../models/dtos/actualizacion/AsignarMarcaDto.model";
import DatosAgenteResponse from "../models/responses/DatosAgente.response";
import IpGeolocationResponse from "../models/responses/ipGeolocation.response";
import MarcasPlaResponse from "../models/responses/MarcasPLA.response";
import PermisosUsuarioResponse from "../models/responses/PermisosUsuario.response";
import { payloadCliente } from "../pages/api/datos/cliente";

export const getClientId = async (payload:payloadCliente, deviceInfo: string, userInfo: string) => {
    const _headers =  defaultheaders;
    _headers.headers.Authorization = bearer + payload.token as string;
    _headers.headers.DeviceInfo = deviceInfo;
    _headers.headers.UserInfo = userInfo;

    const clientResp = await axios.get<{codigoCliente:string}>(AppConfig.auth.getClienteCodigo.replace('${codigoCliente}',payload.codigoCliente).replace('${nroDocumento}',payload.nroDocumento), _headers);
    if (clientResp) return clientResp
    else
        return null    
}

export const listarCodigoCliente = async (token:string,codCliente:string, deviceInfo: string, userInfo: string) => {
    const _headers =  defaultheaders;
    _headers.headers.Authorization = bearer + token;
    _headers.headers.DeviceInfo = deviceInfo;
    _headers.headers.UserInfo = userInfo;

    const url = AppConfig.auth.getClienteCodigo.replace('${codCliente}',codCliente);
        const respUsuario = await axios.get<ClienteDatos>(url,_headers);
            if (respUsuario) {
            return respUsuario;
            } else {
            return null
            }
}

export const listarDatosAgente = async (token:string, usuario:string, deviceInfo: string, userInfo: string) => {
    const _headers =  defaultheaders;
        _headers.headers.Authorization = bearer + token;
        _headers.headers.DeviceInfo = deviceInfo;
        _headers.headers.UserInfo = userInfo;

    const datosAgente = await axios.get<DatosAgenteResponse>(AppConfig.auth.datosAgente.replace('${usuario}',usuario),_headers);
        if (datosAgente) return datosAgente;
        else return null;
}

export const listarPermisosUsuario = async (token:string, deviceInfo: string, userInfo: string, userCarga: string) => {
    const _headers =  defaultheaders;
        _headers.headers.Authorization = bearer + token;
        _headers.headers.DeviceInfo = deviceInfo;
        _headers.headers.UserInfo = userInfo;

    const respPermisos = await axios.get<PermisosUsuarioResponse[]>(AppConfig.auth.permisosUsuario.replace('${usuario}', userCarga),_headers);
    if (respPermisos) return respPermisos;
     else return null
}

export const Geolocalizacion = async () => {
    const respGeolocalizacion = await axios.get<IpGeolocationResponse>(AppConfig.auth.ipGeolocation,);
    if (respGeolocalizacion){
        return respGeolocalizacion;
    }else{
        return null;
    }
}

export const listarMarcasPla = async (token:string, codigoCliente:string, deviceInfo: string, userInfo: string) => {
    const _headers =  defaultheaders;
    _headers.headers.Authorization = bearer + token;
    _headers.headers.DeviceInfo = deviceInfo;
    _headers.headers.UserInfo = userInfo;

    const respMarcas = await axios.get<MarcasPlaResponse[]>(AppConfig.auth.listarMarcasPLA.replace('${codCliente}',codigoCliente),_headers);
       if (respMarcas) return respMarcas;
        else return null
    }


export const asignarMarcaPla = async (token:string, payload:AsignarMarcaPLA, deviceInfo: string, userInfo: string) => {
        const _headers =  defaultheaders;
        _headers.headers.Authorization = bearer + token;
        _headers.headers.DeviceInfo = deviceInfo;
        _headers.headers.UserInfo = userInfo;

    const respMarcas = await axios.post(AppConfig.auth.asignarMarcaPLA,payload,_headers);
        if (respMarcas) return respMarcas;
        else return null
    }