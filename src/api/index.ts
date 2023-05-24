import axios from 'axios';
import { baseUrl } from '../constants/constants';
import { apmAuthInterceptor, apmAuthInterceptorHadoopGDI } from './interceptors';

export const api = axios.create(
    {
        baseURL: baseUrl  
    }
);

export const authApi = axios.create(
    {
        baseURL: "https://apibanking-gw.bancontinental.com.py/autenticarServicio/v1/realms/interno"
    }
    );
    
    export const apmApi = axios.create(
        {
            baseURL: "https://apibanking-gw.bancontinental.com.py/gestion-documental-interno/v1"
        }
    );

    export const apmApiCliente = axios.create(
        {
            baseURL: "https://apibanking-gw.bancontinental.com.py/interno/clientes/datos/v1"
        }
    );

apmApi.interceptors.request.use(apmAuthInterceptor);

export const apmHadoopApi = axios.create(
    {
        baseURL: "http://10.6.3.84:8200",
    }
);

export const apmHadoopGDI = axios.create(
    {
        baseURL: "https://api-test-gw.bancontinental.com.py/hadoop/v1",
    }
);

apmHadoopGDI.interceptors.request.use(apmAuthInterceptorHadoopGDI);

export const tokenUserDocumento = axios.create(
    {
        baseURL: "http://10.6.2.40:8990/v1/api/Archivo"
    }
)