import axios, { AxiosResponse } from 'axios';
import {
    AlzarArchivoRequest, AlzarArchivoResponse, ClienteDatos,
    ClienteDocumento,
    CreateTokenInternoRequest,
    DescargarArchivo,
    DocumentosUsuarioResponse,
    EtiquetaVariable,
    EtiquetaVariableResponse,
    ExtractosServiceDescargarArchivo,
    GuardarDocumentoRequest,                
    HadoopDirectoRequest,
    HadoopDirectoResponse,
    NumeroLegajo,
    Parametros,
    ParametrosVisibles,
    Producto,
    SolicitudCliente,
    SubProducto, 
    TipoBusqueda, 
    TipoDocumento, 
    TipoDocumentoHistoricoResponse, 
    } from '../interfaces/interfaces';
import { apmApi, apmHadoopApi, apmHadoopGDI, tokenUserDocumento } from './index';
import { CreateTokenInternoResponse } from '../interfaces/interfaces';

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
    const URL = `https://desa-docker01.bancontinental.com.py:8200/download`;
    const response = await axios.get<HadoopDirectoRequest>(URL, {
    params: {downloadpath},
    });
    return response;
}

export const postAlzarHadoopDirecto = async (body: FormData, path_images: string, overwrite: boolean, chunksize: number) => {
    // const URL = `/upload?path_images`;
    const URL = `https://desa-docker01.bancontinental.com.py:8200/upload`;
    const {data} = await axios.post<FormData, AxiosResponse<HadoopDirectoResponse>>(
        URL,body, {headers: {'Content-Type':'multipart/form-data'},
                    params:{path_images, overwrite, chunk_size: chunksize},
});

    return data;
}


export async function getClienteDatos(codigoCliente: string) {    
    // const URL = `https://api-sandbox.bancontinental.com.py/interno/clientes/datos/v1/clientes/${codigoCliente}`;    
    const URL = `https://api-test.bancontinental.com.py/interno/clientes/datos/v1/clientes/${codigoCliente}`;    
    const response = await apmApi.get<ClienteDatos>(URL);
    return response
}

export async function getClienteDocumento(numeroDocumento: string) {    
    // const URL = `https://api-sandbox.bancontinental.com.py/interno/clientes/datos/v1/clientes/datos`;            
    const URL = `https://api-test.bancontinental.com.py/interno/clientes/datos/v1/clientes/datos`;            
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

export async function getNumeroLegajo(nextSequence: number) {
    const URL = `/numero-legajo`;
    const response = await apmApi.get<NumeroLegajo[]>(URL, { 
        params: {nextSequence}
    });
    return response;
}

export async function getTipoDocumento() {
    const URL = `/tipos-documentos`;
    const response = await apmApi.get<TipoDocumento[]>(URL, {        
    });
    return response; 
}

export async function getSolicitudCliente() {    
    const URL = `/menus-frontEnd/solicitud-cliente`;
    const response = await apmApi.get<SolicitudCliente[]>(URL);
    return response
}

export async function getTipoBusqueda() {    
    const URL = `/menus-frontEnd/tipo-busqueda`;
    const response = await apmApi.get<TipoBusqueda[]>(URL);
    return response
}

export async function getConsultaDocumentosUser(codigoCliente: string) {
    const URL = `/documentos-usuario`;
    const response = await apmApi.get<DocumentosUsuarioResponse>(URL, {
        params: {codigoCliente},
    });

    return response;

}
export async function getTipoDocumentoHistorico(codigoCliente: string, codigoTipoDocumento: number) {
    const URL = `/tipo-documento-historico`;
    const response = await apmApi.get<TipoDocumentoHistoricoResponse[]>(URL, {
        params: {codigoCliente, codigoTipoDocumento},
    });

    return response;

}


// EXTRACT SERVICE
export const postCreateTokenInterno = async (body: CreateTokenInternoRequest) => {    
    const URL = `http://10.6.2.40:81/v1/api/Token/CreateTokenInterno`
    const {data} = await axios.post<AlzarArchivoRequest, AxiosResponse<CreateTokenInternoResponse>>(URL, body,
        {headers: {
            "x-api-canal": `FSYS-WEB`,
            "Content-Type": "application/json"
        }
    });
     
    return data;
}

export const postAlzarArchivo = async (body: AlzarArchivoRequest, token: string) => {    
    const {data} = await tokenUserDocumento.post<AlzarArchivoRequest, AxiosResponse<AlzarArchivoResponse>>(`/AlzarArchivo`, body,
        {headers: {
            "Content-Type": "application/json",            
            Authorization: `Bearer ${token}`}});
     
    return data;
}

export const postDescargarArchivo = async (body: DescargarArchivo, token: string) => {    
    const {data} = await tokenUserDocumento.post<DescargarArchivo, AxiosResponse<string>>(`/DescargarArchivo`, body, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json"}});

    return data;
}
export const postEstractosServiceDescargar = async (body: ExtractosServiceDescargarArchivo) => {    
    const {data} = await axios.post<ExtractosServiceDescargarArchivo, AxiosResponse<string>>( ``, {
        headers: { "Content-Type": "application/xml"}});

    return data;
}