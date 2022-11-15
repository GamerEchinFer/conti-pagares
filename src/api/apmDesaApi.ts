import { AxiosResponse } from 'axios';
import { EtiquetaVariable, EtiquetaVariableResponse, HadoopDirectoRequest, HadoopDirectoResponse, Parametros, ParametrosVisibles, Producto, SubProducto } from '../interfaces/interfaces';
import { apmApi, apmHadoopApi } from './index';

export async function getProductos() {    
    const URL = `/productos`;    
    const response = await apmApi.get<Producto[]>(URL);
    return response
}

export async function getSubProductos(idProducto: number) {    
    const URL = `/subproductos`;    
    const response = await apmApi.get<SubProducto[]>(URL, {params: {idProducto}});
    return response
}

export async function getParametros(tipo: string) {    
    const URL = `/parametros`;    
    const response = await apmApi.get<Parametros[]>(URL, {params: {tipo}});
    return response
}

export async function getParametrosVisibles(idProducto: number, idSubProducto: number) {    
    const URL = `/parametros-visibles`;
    const response = await apmApi.get<ParametrosVisibles[]>(URL, {
        params: {idProducto, idSubProducto},        
    });
    return response
}

export const postEtiquetaVariable = async (body: EtiquetaVariable[]) => {
    const URL =  `/etiquetas-variables-periodicidad`;
    const {data} = await apmApi.post<EtiquetaVariable[], AxiosResponse<EtiquetaVariableResponse[]>>(URL, body,{headers: {config:'keycloakHeaders'}});
    return data;
}

export async function getDescargarHadoopDirecto(downloadpath: string) {
    const URL = `/download`;
    const response = await apmHadoopApi.get<HadoopDirectoRequest>(URL, {
    params: {downloadpath},
    });
    return response;
}

export const postAlzarHadoopDirecto = async (body: FormData, path_images: string, overwrite: boolean, chunksize: number) => {
    const URL = `/upload`;
    const {data} = await apmHadoopApi.post<FormData, AxiosResponse<HadoopDirectoResponse>>(
        URL,body, {headers: {'Content-Type':'multipart/form-data'},
                    params:{path_images, overwrite, chunksize},
});

    return data;
}
