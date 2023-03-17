import axios from 'axios';
import { baseUrl } from '../constants/constants';
import { apmAuthInterceptor, apmAuthInterceptorHadoop, apmAuthInterceptorHadoopGDI } from './interceptors';

export const api = axios.create(
    {
        baseURL: baseUrl  
    }
);


// export const continentalApi = axios.create(
//     {
//         baseURL: baseUrl2  
//     }
// );

// ES PARA CONECTARSR CON KEYCLOAK Y GENERA EL ACCESS TOKEN. PERO ESTE TIENE QUE ESTAR EN NEXTJS
export const authApi = axios.create(
    {
        // baseURL: "https://api-test-gw.bancontinental.com.py/autenticarServicio/v1/realms/interno"  
        // baseURL: "https://api-sandbox-gw.bancontinental.com.py/autenticarServicio/v1/realms/interno"  
        // baseURL: "https://api-sandbox.bancontinental.com.py/autenticarServicio/v1/realms/interno"
        baseURL: "https://api-test.bancontinental.com.py/autenticarServicio/v1/realms/interno"  
    }
);

// SON LAS APIS QUE TRABAJAN CON SUBSCRIPTION KEY Y CON AUTHORIZATION EN DONDE SE LE PASA EL ACCESS TOKEN
export const apmApi = axios.create(
    {
        baseURL: "https://api-test.bancontinental.com.py/gestion-documental-interno/v1"
        // baseURL: "https://api-sandbox.bancontinental.com.py/gestion-documental-interno/v1"    
    }
);

apmApi.interceptors.request.use(apmAuthInterceptor);

export const apmHadoopApi = axios.create(
    {
        // baseURL: "http://10.6.3.84:5051"
        // baseURL: "http://10.6.3.84:5055"
        baseURL: "http://10.6.3.84:8200",
        // baseURL: "https://apihadoop-desa.bancontinental.com.py"
    }
);

// comment the subscription key for use unique without problems
// apmHadoopApi.interceptors.request.use(apmAuthInterceptorHadoop);


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