import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { keycloakHeaders } from "../constants/constants";
import Cookies from "universal-cookie";
import { encriptar } from "../helpers/encriptar";
import ErrorResponse from "../models/responses/ErrorResponse";
import abiError400 from '../assets/img/errorBar/abi-001.svg';
import abiError401 from '../assets/img/errorBar/abi-007.svg';
import abiError404 from '../assets/img/errorBar/abi-002.svg';
import abiError500 from '../assets/img/errorBar/abi-003.svg';
import abiError503 from '../assets/img/errorBar/abi-004.svg';
import { browserName, browserVersion, fullBrowserVersion, osName, osVersion } from "react-device-detect";
import { dataError, uiSetError } from "../redux/slices/ui/ui.slice";
import { store } from "../redux/store";
import { ConfigApiInterna } from "../config/config";

export const apmAuthInterceptor = (config: AxiosRequestConfig) => {

    const gdiAuth = store.getState().authGDI.gdiAuth    
    

    if (!gdiAuth || !gdiAuth.access_token) {
        return config;
    }

    if (config.headers) {
        config.headers["Authorization"] = `${gdiAuth.token_type} ${gdiAuth.access_token}`;
        config.headers["Subscription-Key"] = keycloakHeaders["Subscription-Key"];
    }

    return config;
}


const interceptors = () => {
    const defaultErrorDescription = 'Por algún motivo, ocurrió un error durante el proceso. Por favor, vuelve a intentarlo';
    
    if (typeof window === 'undefined') {
        axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL as string;
    }

    axios.defaults.timeout = parseInt(process.env.NEXT_PUBLIC_API_TIME_OUT as string);
    axios.defaults.headers.common = {
        'Content-Type': 'application/json',       
        'Grant-Type': 'client_credentials',
        'Scope': 'profile',
        'Canal' : 'web'
    }

    const cookies = new Cookies();
    let UserInfo: string = '';
    let Device: string = '';
    let req: AxiosRequestConfig = {};

    axios.interceptors.request.use((config: AxiosRequestConfig) => {
        if(typeof window !== 'undefined'){
            if(store.getState().auth.codigoCliente !== null){
                UserInfo = encriptar(`${JSON.stringify(store.getState().auth.codigoCliente)}`)
            };

            if(cookies.get('DeviceInfo') === undefined || cookies.get('DeviceInfo').length === 0){
                const DeviceInfo = {
                    acceso:                     process.env.NEXT_PUBLIC_CANAL as string,
                    sistemaOperativo:           `${osName} ${osVersion}`,
                    navegador:                  `${browserName} ${browserVersion}`,
                    versionSistemaOperativo:    osVersion,
                    versionNavegador:           fullBrowserVersion,
                    idDispositivo:              store.getState().auth.idDispositivo,
                    ipDispositivo:              store.getState().auth.ipGeolocation !== null ? store.getState().auth.ipGeolocation?.ip : '',
                    dispositivo:                window.navigator.userAgent,
                    pais:                       store.getState().auth.ipGeolocation !== null ? store.getState().auth.ipGeolocation?.country_name : '',
                    ciudad:                     store.getState().auth.ipGeolocation !== null ? store.getState().auth.ipGeolocation?.city : '',
                    latitud:                    store.getState().auth.ipGeolocation !== null ? store.getState().auth.ipGeolocation?.latitude : '',
                    longitud:                   store.getState().auth.ipGeolocation !== null ? store.getState().auth.ipGeolocation?.longitude : '',
                };
                cookies.set('DeviceInfo', encriptar(`${JSON.stringify(DeviceInfo)}`), { path: '/' });
                Device = cookies.get('DeviceInfo');
            }else{
                Device = cookies.get('DeviceInfo');
            }
        }

        config.headers!['DeviceInfo'] = Device;
        config.headers!['UserInfo'] = UserInfo;
        req = config;
        return config;
    });


    async (error: AxiosError<ErrorResponse>) => {

        const alertDescription = error.response?.data?.errorDescription || error.response?.data?.errorMessage || error.response?.data?.message || defaultErrorDescription;

        if (typeof window !== 'undefined') {
            store.dispatch(uiSetError(alertDescription));
            if (error.response?.status !== 401 && (error.config?.url?.includes(ConfigApiInterna.auth.permisosUsuario) || error.config?.url?.includes(ConfigApiInterna.auth.permisosUsuario) || error.config?.url?.includes((ConfigApiInterna.auth.permisosUsuario)))){
                return error.response;
            }
            switch (error.response?.status) {
                case 400:
                    store.dispatch(dataError({
                        codigo: error.response?.status,
                        imagen: abiError400
                    }));
                    return error.response.data
                case 401:
                    store.dispatch(dataError({
                        codigo: error.response?.status,
                        imagen: abiError401
                    }));
                    return error.response.data
                case 403:
                    store.dispatch(dataError({
                        codigo: error.response?.status,
                        imagen: abiError400
                    }));
                    return error.response.data
                case 404:
                    store.dispatch(dataError({
                        codigo: error.response?.status,
                        imagen: abiError404
                    }));
                    return error.response.data
                case 500:
                    store.dispatch(dataError({
                        codigo: error.response?.status,
                        imagen: abiError500
                    }));
                    return error.response.data
                case 503:
                    store.dispatch(dataError({
                        codigo: error.response?.status,
                        imagen: abiError503
                    }));
                    return error.response.data
                case 506:
                    store.dispatch(dataError({
                        codigo: error.response?.status,
                        imagen: abiError503
                    }));
                    return error.response?.data
            }
            return error?.response?.data
        }else if(error.response?.status){
            if((error.response.data as any).error_description === 'Invalid client secret' || (error.response.data as any).error_description === 'Client not enabled to retrieve service account' ) return {status: error.response.status ,descripcion:(error.response.data as any).error_description};
            return error.response
        }else{
            return error
        }
    };
}

export default interceptors;
