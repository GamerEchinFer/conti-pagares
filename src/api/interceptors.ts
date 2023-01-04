import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { keycloakHeaders, keyCloakHeadersHadoop } from "../constants/constants";
import { AuthenticationResponse } from "../interfaces/interfaces";
import Cookies from "universal-cookie";
import store from "../redux/store";
import { encriptar } from "../helpers/encriptar";
import ErrorResponse from "../models/responses/ErrorResponse";
import abiError400 from '../assets/img/errorBar/abi-001.svg';
import abiError401 from '../assets/img/errorBar/abi-007.svg';
import abiError404 from '../assets/img/errorBar/abi-002.svg';
import abiError500 from '../assets/img/errorBar/abi-003.svg';
import abiError503 from '../assets/img/errorBar/abi-004.svg';
import { v4 as uuidv4 } from 'uuid';
import DeviceDto from "../models/dtos/Device.model";
import { browserName, browserVersion, fullBrowserVersion, osName, osVersion } from "react-device-detect";
import { dataError, uiSetError } from "../redux/slices/ui/ui.slice";
import AppConfig from "../config/config";

export const apmAuthInterceptor = (config: AxiosRequestConfig) => {

    const gdiAuth = localStorage.getItem("gdi-auth");

    if (!gdiAuth) {
        return config;
    }

    const values: AuthenticationResponse = JSON.parse(gdiAuth);

    if (!values || !values.access_token) {
        return config;
    }

    if (config.headers) {
        config.headers["Authorization"] = `${values.token_type} ${values.access_token}`;
        config.headers["Subscription-Key"] = keycloakHeaders["Subscription-Key"];
    }

    return config;
}

export const apmAuthInterceptorHadoop = (config: AxiosRequestConfig) => {
    if(config.headers) {
        config.headers["Subscription-Key"] = keyCloakHeadersHadoop["Subscription-Key"];
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
    let Device: string = '';
    let UserInfo: string = '';

    axios.interceptors.request.use((config: AxiosRequestConfig) => {
        if(typeof window !== 'undefined'){
            if(store.getState().auth.datosAgente !== null){
                UserInfo = encriptar(`${JSON.stringify(store.getState().auth.datosAgente)}`)
            };

            if(cookies.get('Cookie') === undefined || cookies.get('Cookie').length === 0){
                const DeviceInfo: DeviceDto = {
                    acceso:                     'WEB',
                    sistemaOperativo:           `${osName} ${osVersion}`,
                    navegador:                  `${browserName} ${browserVersion}`,
                    versionSistemaOperativo:    osVersion,
                    versionNavegador:           fullBrowserVersion,
                    idDispositivo:              `${uuidv4()}`,
                    ipDispositivo:              store.getState().auth.ipGeolocation !== null ? store.getState().auth.ipGeolocation?.ip : '',
                    dispositivo:                window.navigator.userAgent,
                    pais:                       store.getState().auth.ipGeolocation !== null ? store.getState().auth.ipGeolocation?.country_name : '',
                    ciudad:                     store.getState().auth.ipGeolocation !== null ? store.getState().auth.ipGeolocation?.city : '',
                    latitud:                    store.getState().auth.ipGeolocation !== null ? store.getState().auth.ipGeolocation?.latitude : '',
                    longitud:                   store.getState().auth.ipGeolocation !== null ? store.getState().auth.ipGeolocation?.longitude : '',
                };
                cookies.set('Cookie', encriptar(`${JSON.stringify(DeviceInfo)}`), { path: '/' });
                Device = cookies.get('Cookie');
            }else{
                Device = cookies.get('Cookie');
            };
        }

        config.headers!['DeviceInfo'] = Device;
        config.headers!['UserInfo'] = UserInfo;
        return config;
    });

    axios.interceptors.response.use(
        (response: AxiosResponse<any>) => {
            return response;
    },
    async (error: AxiosError<ErrorResponse>) => {
    const alertDescription = error.response?.data?.errorDescription || error.response?.data?.errorMessage || error.response?.data?.message || defaultErrorDescription;
       if (typeof window !== 'undefined') {
        store.dispatch(uiSetError(alertDescription));
        // if (error.response?.status !== 401 && (error.config.url?.includes(AppConfig.interna.auth.actualizarParticulares) || error.config.url?.includes(AppConfig.interna.auth.actualizarLaborales) || error.config.url?.includes(AppConfig.interna.auth.asignarMarcaPLA))){
        //     return error.response;
        // }
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
       }else{
            return error.response
       }

    }
);

}

export default interceptors
