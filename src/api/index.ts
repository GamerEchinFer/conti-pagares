import axios from 'axios';
import { baseUrl } from '../constants/constants';
import { apmAuthInterceptor } from './interceptors';

export const api = axios.create(
    {
        baseURL: baseUrl  
    }
);

export const authApi = axios.create(
    {
        baseURL: process.env.NEXT_PUBLIC_API_BASE_URL+"/autenticarServicio/v1/realms/interno"
    }
);
    
export const apmApi = axios.create(
    {
        baseURL: process.env.NEXT_PUBLIC_API_BASE_URL+"/gestion-documental-interno/v1"
    }
);

export const apmApiCliente = axios.create(
    {
        baseURL: process.env.NEXT_PUBLIC_API_BASE_URL+"/interno/clientes/datos/v1"
    }
);

export const apmApiHadoop = axios.create(
    {
        baseURL: process.env.NEXT_PUBLIC_URL_HADOOP
    }
);

apmApi.interceptors.request.use(apmAuthInterceptor);
apmApiCliente.interceptors.request.use(apmAuthInterceptor);