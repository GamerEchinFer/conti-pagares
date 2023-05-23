import axios from "axios";
import { ConfigApiExterna } from "../config/config";
import { bearer, defaultheaders } from "../helpers/headers";
import { LoginResponse, PermisosUsuarioResponse } from "../models/responses";
import { IpGeolocationResponse } from "../models/responses/ipGeolocation.response";

export const loginApiGDI = async () => {

    const loginResp = await axios.post<LoginResponse>(ConfigApiExterna.auth.token
                                                    , null
                                                    , { headers: { 
                                                        'Client-Id': process.env.NEXT_PUBLIC_CLIENTE_ID as string, 
                                                        'Client-Secret': process.env.NEXT_PUBLIC_CLIENT_SECRET as string,
                                                        'Subscription-Key': process.env.NEXT_PUBLIC_SUSCRIPTION_KEY as string,
                                                        }
                                                    });
    if (loginResp)  return loginResp
    else
        return null
}

export const listarPermisosUsuario = async (token:string, deviceInfo: string, userInfo: string, userCarga: string) => {
    const _headers =  defaultheaders;
    _headers.headers.Authorization = bearer + token;
    _headers.headers.DeviceInfo = deviceInfo;
    _headers.headers.UserInfo = userInfo;

    const respPermisos = await axios.get<PermisosUsuarioResponse[]>(ConfigApiExterna.auth.permisosUsuario.replace('${usuario}', userCarga),_headers);
    if (respPermisos) return respPermisos;
     else return null
}

export const Geolocalizacion = async () => {
    const respGeolocalizacion = await axios.get<IpGeolocationResponse>(ConfigApiExterna.auth.ipGeolocation,);
    if (respGeolocalizacion){
        return respGeolocalizacion;
    }else{
        return null;
    }
}