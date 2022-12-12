import { AxiosResponse } from 'axios';
import { ClienteDatos,
        ClienteDocumento,
        EtiquetaVariable,
        EtiquetaVariableResponse,
        GuardarDocumentoRequest,                
        HadoopDirectoRequest,
        HadoopDirectoResponse,
        NumeroLegajo,
        Parametros,
        ParametrosVisibles,
        Producto,
        SubProducto, 
        TiposDocumentos} from '../interfaces/interfaces';
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
    const URL =  `/checklist`;
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
    const URL = `/upload?path_images`;
    const {data} = await apmHadoopApi.post<FormData, AxiosResponse<HadoopDirectoResponse>>(
        URL,body, {headers: {'Content-Type':'multipart/form-data'},
                    params:{path_images, overwrite, chunk_size: chunksize},
});

    return data;
}


export async function getClienteDatos(codigoCliente: string) {    
    const URL = `https://api-sandbox.bancontinental.com.py/interno/clientes/datos/v1/clientes/${codigoCliente}`;    
    const response = await apmApi.get<ClienteDatos>(URL);
    return response
}

export async function getClienteDocumento(numeroDocumento: string) {    
    const URL = `https://api-sandbox.bancontinental.com.py/interno/clientes/datos/v1/clientes/datos`;            
    const response = await apmApi.get<ClienteDocumento>(URL, {
        params: {numeroDocumento},        
    });
    return response
}

export const postGuardarDocumento = async (body: GuardarDocumentoRequest) => {
    const URL =  `/guardar-documento`;
    const {data} = await apmApi.post<GuardarDocumentoRequest, AxiosResponse<number>>(URL, body,{headers: {config:'keycloakHeaders'}});
    console.log(data);
    
    return data;
} 

export async function getNumeroLegajo() {
    const URL = `/numero-legajo`;
    const response = apmApi.get<NumeroLegajo[]>(URL);
    return response;
}

export async function getTipoDocumento() {
    const URL = `/tipos-documentos`;
    const response = apmApi.get<TiposDocumentos[]>(URL);
    return response;
}
