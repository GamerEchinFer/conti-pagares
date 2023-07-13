import { AxiosResponse } from 'axios';
import {
    ClienteDatos,
    ClienteDocumento,
    DocumentosUsuarioResponse,
    EtiquetaVariable,
    EtiquetaVariableResponse,
    GuardarDocumentoRequest,                
    GuardarHistorialUsuarioRequest,                
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
    TipoDocumentoHistoricoResponse
    } from '../interfaces/interfaces';
import { apmApi, apmApiCliente, apmApiHadoop } from './index';

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
    const data = await apmApi.post<EtiquetaVariable[], AxiosResponse<EtiquetaVariableResponse[]>>(URL, body,{headers: {config:'keycloakHeaders'}});
    return data;
}

export async function getDescargarHadoopDirecto(downloadpath: string) {
    const URL = `/download`;
    const response = await apmApiHadoop.get<HadoopDirectoRequest>(URL, {
        params: {downloadpath},
    });
    return response;
}

export const postAlzarHadoopDirecto = async (body: FormData, path_images: string, overwrite: boolean, chunksize: number) => {
    const URL = `/upload`;
    const response = await apmApiHadoop.post<FormData, AxiosResponse<HadoopDirectoResponse>>(URL, body, {
            headers: {'Content-Type':'multipart/form-data'},
            params:{path_images, overwrite, chunk_size: chunksize},
        });        
    if (response && response.data) {
        return response.data;
    }

    return undefined;
}

export async function getClienteDatos(codigoCliente: string) {    
    const URL = `/clientes/${codigoCliente}`;    
    const response = await apmApiCliente.get<ClienteDatos>(URL, {
        params: {codigoCliente}
    });
    return response
}

export async function getClienteDocumento(numeroDocumento: string) {    
    const URL = `/clientes/datos`;            
    const response = await apmApiCliente.get<ClienteDocumento>(URL, {
        params: {numeroDocumento},        
    });
    return response
}

export const postGuardarDocumento = async (body: GuardarDocumentoRequest) => {
    const URL =  `/guardar-documento`;
    const {data} = await apmApi.post<GuardarDocumentoRequest, AxiosResponse<number>>(URL, body);
    
    return data;
}

export const postGuardarHistorialUsuario = async (body: GuardarHistorialUsuarioRequest) => {
    const URL =`/guardar-historial-usuario`;
    const {data} = await apmApi.post<GuardarHistorialUsuarioRequest, AxiosResponse<undefined>>(URL, body);

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