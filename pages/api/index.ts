import axios from 'axios';
import { baseUrl, baseUrl2 } from '../../constants/constants';
import { apmAuthInterceptor, apmAuthInterceptorHadoop } from './interceptors';

export const api = axios.create(
    {
        baseURL: baseUrl  
    }
);

export const continentalApi = axios.create(
    {
        baseURL: baseUrl2  
    }
);

// ES PARA CONECTARSR CON KEYCLOAK Y GENERA EL ACCESS TOKEN. PERO ESTE TIENE QUE ESTAR EN NEXTJS
export const authApi = axios.create(
    {
        baseURL: "https://api-test-gw.bancontinental.com.py/autenticarServicio/v1/realms/interno"  
    }
);

// SON LAS APIS QUE TRABAJAN CON SUBSCRIPTION KEY Y CON AUTHORIZATION EN DONDE SE LE PASA EL ACCESS TOKEN
export const apmApi = axios.create(
    {
        baseURL: "https://api-test.bancontinental.com.py/gestion-documental-interno/v1"  
    }
);

apmApi.interceptors.request.use(apmAuthInterceptor);

export const apmHadoopApi = axios.create(
    {
        // baseURL: "https://apihadoop-desa.bancontinental.com.py/download?downloadpath=/"
        // baseURL: "http://10.6.3.84:5051"
        // baseURL: "http://10.6.3.84:5055"
        baseURL: "http://10.6.3.84:5051"
    }
);

apmHadoopApi.interceptors.request.use(apmAuthInterceptorHadoop);
