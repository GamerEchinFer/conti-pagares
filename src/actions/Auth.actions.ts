import { apiPermisosUsuarioInterna, apiTokenInterna } from "../api-interna/Auth";
import { Geolocalizacion } from "../api/ApiAuth";
import { PermisosUsuarioResponse } from "../models/responses";
import LoginResponse from "../models/responses/Login.response";
import { showLoadingPermisos, showLoadingToken, showLoadingIpGeolocation } from "../redux/slices/ui/ui.slice";
import { AppDispatch } from "../redux/store";
import { login as loginReducer, getPermisosUsuario as getPermisosUsuarioReducer, getIpGeolocation as getIpGeolocationReducer } from "../redux/slices/auth/auth.slice";

export const login = ()  => {
    return async (dispatch:AppDispatch) => {
        dispatch(showLoadingToken(true));
         const loginResp = await apiTokenInterna() as LoginResponse;
        if (loginResp && loginResp !== null) {
            dispatch(showLoadingToken(false));
            dispatch(loginReducer(loginResp as string));
        } else {
            dispatch(loginReducer(null));
        }
        dispatch(showLoadingToken(false));
    }
};

export const getPermisosUsuario = (token:string, userCarga:string) => {
    return async (dispatch:AppDispatch) => {
        dispatch(showLoadingPermisos(true));
        const DatosResp = await apiPermisosUsuarioInterna(token,userCarga);
        if (DatosResp != null) {
            dispatch(getPermisosUsuarioReducer(DatosResp as PermisosUsuarioResponse[]));
            dispatch(showLoadingPermisos(false));
        }
        dispatch(showLoadingPermisos(false));
    }
}

export const getIpGeolocation = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(showLoadingIpGeolocation(true));
        const geolocation = await Geolocalizacion();
        if (geolocation !== null) {
            dispatch(getIpGeolocationReducer(geolocation.data));
        }
        dispatch(showLoadingIpGeolocation(false));
    }
};
