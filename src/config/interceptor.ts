import axios, { AxiosRequestConfig } from "axios";
import { encriptar } from "../helpers/encriptar";
import { browserName, browserVersion, fullBrowserVersion, osName, osVersion } from "react-device-detect";
import Cookies from "universal-cookie";
import { store } from "../redux/store";

const interceptor = () => {

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
            if(store.getState().auth.datosAgente !== null){
                UserInfo = encriptar(`${JSON.stringify(store.getState().auth.datosAgente)}`)
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

}

export default interceptor;