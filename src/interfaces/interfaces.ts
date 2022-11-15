export interface SolicitudCliente {
    id: number;
    nameSolicitud: string;
    nameDetalle: string;
}

export interface TipoBusqueda {
    id: number;
    nameTipoBusqueda: string;
}

export interface DatosCliente {
    id: number;
    codCliente: number;
    apellidoCliente: string;
    nombreCliente: string;
    tipoPersona: string;
}  

export interface Producto {
    idProducto: number;
    descripcion: string;
}

export interface SubProducto {
    idSubProducto: number;
    descripcion: string;
}

export interface ParametrosVisibles {
    parametroVisible: string;
}
export interface Parametros {
    idParametro: number;
    descripcion: string;
}

export interface ParametrosVisibleLista {
    tipoParametro: string;
    parametrosVisibles: string[];
}

export interface EtiquetaVariable {
    nombre: string;
    valor: string;
}

export interface EtiquetaVariableResponse {
    // idTipoDocumento: number;
    idTipoDocumento: string;
    tipoDocumento: string;
    periodicidad: number;
    tieneDocumento: boolean;
    datosAdicionales: string [];
}

export interface AutenticarServicioHeader {
    "Grant-Type": string;
    Scope: string;
    "Subscription-Key": string;
    "Client-Id": string;
    "Client-Secret": string;
}

export interface AuthenticationResponse {
    access_token?:           string;
    expires_in?:             string;
    refresh_expires_in?:     string;
    refresh_token?:          string;
    token_type?:             string;
    id_token?:               string;
    "not-before-policy"?:    string;
    session_state?:          string;
    scope?:                  string;
    error?:                  string;
    error_description?:      string;
}

export interface PeriodicidadTipoDocumento {
    idTipoDocumento: number;
}

export interface HadoopDirectoResponse {
    LOC: string;
    MSG: string;
    TYPE: number;
}


export interface AuthHadoop {
    "Subscription-Key": string;
}

export interface HadoopDirectoRequest {
    downloadpath: string;
}

export interface HadoopDirecto {
    file: string;
}