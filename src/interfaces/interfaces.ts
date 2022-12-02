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
   "datosAdicionales": [
        {
            'idDocumento': number;
            'codigoTipoDocumento': number;
            'descripcion': string;
            'codigoEstadoDocumento': string;
            'fechaEmision': Date;
            'periodo': string;
            'numeroOperacion': string;
            'rutaHadoop': string;
            'usuarioCarga': string;
            'fechaRegistro': Date;
            'userAprobador': string;
            'fechaAprobacion': Date;
            'usuarioVerificador': string;
            'fechaVerificacion': string;
        }
    ];
    file?: any; // Dentro del frontend
    openModal?: boolean;
    base64?: string;
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
    LOC: string;
    MSG: string;
    TYPE: number;
}

export interface HadoopDirecto {
    file: string;
}

export interface ClienteDatos {
    primerNombre: string;
    segundoNombre: string;
    primerApellido: string;
    segundoApellido: string;
    direccion: string;
    ciudad: string;
    telefono: string;
    celular: string;
    cedula: string;
    fechaNacimiento: string;
    ocupacion: string;
    fechaAlta: string;
    pais: string;
    localidad: string;
    clasificacion: string;
    codigoSucursal: string;
    codigoOficial: string;
    codigoRegion: string;
    tipoPersona: string;
    tipoDocumento: string;
    sexo: string;
    codigoEstadoCivil: string;
    correo: string;
    codigoCliente: string;
    sucursal: string;
    oficial: string;
    calificacion: string;
    nombreBarrio: string;
    estadoCivil: string;
}

export interface ClienteDocumento {
    primerNombre: string;
    segundoNombre: string;
    primerApellido: string;
    segundoApellido: string;
    direccion: string;
    ciudad: string;
    telefono: string;
    celular: string;
    cedula: string;
    fechaNacimiento: string;
    ocupacion: string;
    fechaAlta: string;
    pais: string;
    localidad: string;
    clasificacion: string;
    codigoSucursal: string;
    codigoOficial: string;
    codigoRegion: string;
    tipoPersona: string;
    tipoDocumento: string;
    sexo: string;
    codigoEstadoCivil: string;
    correo: string;
    codigoCliente: string;
    sucursal: string;
    oficial: string;
    calificacion: string;
    nombreBarrio: string;
    estadoCivil: string;
}

export interface GuardarDocumento {
    codigoTipoDocumento: number,
    rutaDocumento: string;
    fechaRegistro: Date;
    fechaEmision: Date;
    descripcionDocumento: string;
    codigoCliente: string;
    codigoLegajo: number;
    hadoopPath: string;
    codigoUsuario: string;
    codigoProducto: number;
    codigoSubproducto: number;
}

export interface GuardarDocumentoResponse {
    idDocumentos: number;
}