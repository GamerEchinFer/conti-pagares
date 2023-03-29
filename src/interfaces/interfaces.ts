export interface SolicitudCliente {
    id:             number;
    nameSolicitud:  string;
    nameDetalle:    string;
}

export interface TipoBusqueda {
    id:               number;
    nameTipoBusqueda: string;
}

export interface DatosCliente {
    id:                 number;
    codCliente:         number;
    apellidoCliente:    string;
    nombreCliente:      string;
    tipoPersona:        string;
}  

export interface Producto {
    idProducto:     number;
    descripcion:    string;
}

export interface SubProducto {
    idSubProducto:  number;
    descripcion:    string;
}

export interface ParametrosVisibles {
    parametroVisible: string;
}
export interface Parametros {
    idParametro: number;
    descripcion: string;
}

export interface ParametrosVisibleLista {
    tipoParametro:      string;
    parametrosVisibles: string[]; 
}

export interface EtiquetaVariable {
    nombre: string;
    valor:  string;
}

export type EtiquetaVariableBody = {[key: string]: EtiquetaVariable}

export interface EtiquetaVariableResponse {
    // idTipoDocumento: number;
    idTipoDocumento:    string;
    tipoDocumento:      string;
    periodicidad:       number;
    tieneDocumento:     boolean;
    "datosAdicionales": [
        {
            'idDocumento':              number;
            'codigoTipoDocumento':      number;
            'descripcion':              string;
            'codigoEstadoDocumento':    string;
            'fechaEmision':             Date;
            'periodo':                  string;
            'numeroOperacion':          string;
            'rutaHadoop':               string;
            'usuarioCarga':             string;
            'fechaRegistro':            Date;
            'userAprobador':            string;
            'fechaAprobacion':          Date;
            'usuarioVerificador':       string;
            'fechaVerificacion':        string;
        }
    ];

    file?:                          any; // Dentro del frontend
    openModal?:                     boolean;
    openModalPeriodo?:              boolean;
    openModalView?:                 boolean;
    openModalConsultaDocumentos?:   boolean;
    base64?:                        string;
    base64Modified?:                string;
    totalPages?:                    number;
    totalPagesModified?:            number;
    size?:                          number;
    sizeModified?:                  number;
    filename:                       string;
}

export interface AutenticarServicioHeader {
    "Grant-Type":       string;
    Scope:              string;
    "Subscription-Key": string;
    "Client-Id":        string;
    "Client-Secret":    string;
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
    loc:    string;
    msg:    string;
    type:   number;
}

export interface AuthHadoop {
    "Subscription-Key": string;
}
export interface AuthHadoopGDI {
    "Subscription-Key": string;
}

export interface HadoopDirectoRequest {
    loc:    string;
    msg:    string;
    type:   number;
}

export interface HadoopDirecto {
    file: string;
}

export interface ClienteDatos {
    primerNombre:       string;
    segundoNombre:      string;
    primerApellido:     string;
    segundoApellido:    string;
    direccion:          string;
    ciudad:             string;
    telefono:           string;
    celular:            string;
    cedula:             string;
    fechaNacimiento:    string;
    ocupacion:          string;
    fechaAlta:          string;
    pais:               string;
    localidad:          string;
    clasificacion:      string;
    codigoSucursal:     string;
    codigoOficial:      string;
    codigoRegion:       string;
    tipoPersona:        string;
    tipoDocumento:      string;
    sexo:               string;
    codigoEstadoCivil:  string;
    correo:             string;
    codigoCliente:      string;
    sucursal:           string;
    oficial:            string;
    calificacion:       string;
    nombreBarrio:       string;
    estadoCivil:        string;
}

export interface ClienteDocumento extends ClienteDatos {}


export interface GuardarDocumentoRequest {
    codigoTipoDocumento:    number,
    rutaDocumento:          string;
    fechaRegistro?:         any;
    fechaEmision:           any;
    descripcionDocumento:   string;
    hadoop:                 string;
    codigoCliente:          string;
    codigoLegajo:           number;
    hadoopPath:             string;
    codigoUsuario:          string;
    codigoProducto:         number;
    codigoSubproducto:      number;
    operacion:              string;
}
export interface NumeroLegajo {
    nextSequence: number;
}

export interface TipoDocumento {
    idTipoDocumento:    number;
    descripcion:        string;
    idGrupo:            number;
    tiempoVencimiento:  number;
    estado:             number;
    esInterno:          boolean;
    esRelacionable:     boolean;
    validezTemporal:    number;
    esDocumentoLegales: boolean;
    periodicidad:       number;
}

export interface GuardarHistorialUsuario {
    codigoCliente:                string;
    estado:                       number;
    cantidadTotalDocumentos:      number;
    cantidadDocumentosIngresados: number;
    usuario:                      string;
    condiciones:                  Condiciones[];
}

export interface Condiciones {
    nombreCondicion: string;
    valorCondicion:  string;
}


export interface AlzarArchivoRequest {
    descripcion:        string;
    fileStringBase64:   string;
    fileName:           string;
    convertirPDF:       boolean;
    path:               string;
}

export interface AlzarArchivoResponse {
    path: string;
}

export interface DescargarArchivo {
    path: string;
}

export interface CreateTokenInternoRequest {
    usuario:    string;
    password:   string;
}

export interface CreateTokenInternoResponse {
    token: string;
}

export interface ConsultaDocumentosUser {
    codigoCliente: string;
}

export interface DocumentosUsuarioResponse {
    filtroGrupo:        DocumentosUsuarioFiltro[];
    coleccionDocumento: ColeccionDocumento[];
}

export interface ColeccionDocumento {
    datosAdicionales: DatosAdicionales;
    filtroDocumento:  DocumentosUsuarioFiltro[];
}

export interface DatosAdicionales {
    idDocumento:           number;
    codigoTipoDocumento:   number;
    descripcion:           string;
    codigoEstadoDocumento: string;
    fechaEmision:          Date;
    fechaVencimiento:      Date;
    periodo:               string;
    numeroOperacion:       null | string;
    rutaHadoop:            string;
    usuarioCarga:          string;
    fechaRegistro:         Date;
    userAprobador:         null;
    fechaArobacion:        Date;
    usuarioVerificador:    null;
    fechaVerificacion:     null;
}

export interface DocumentosUsuarioFiltro {
    idGrupo:          number;
    grupoDescripcion: string;
    filtroSubgrupo:   DocumentosUsuarioFiltroSubgrupo[];
}

export interface DocumentosUsuarioFiltroSubgrupo {
    idSubgrupo:          number;
    subgrupoDescripcion: string;
}

export interface TipoDocumentoHistoricoResponse {
    idDocumento:            number,
    codigoTipoDocumento:    number,
    descripcion:            string,
    codigoEstadoDocumento:  string,
    fechaEmision:           Date,
    fechaVencimiento:       Date,
    periodo:                number,
    numeroOperacion:        number,
    rutaHadoop:             string,
    usuarioCarga:           string,
    fechaRegistro:          Date,
    userAprobador:          string,
    fechaArobacion:         Date,
    usuarioVerificador:     string,
    fechaVerificacion:      string
}


export interface ExtractosServiceDescargarArchivo {
     usuario:       string;
     noise:         string;
     stringResult:  string;
     path:          string;
     tipo:          string;
}
export interface ExtractosServiceSubirArchivo {
     usuario:       string;
     noise:         string;
     stringResult:  string;
     path:          string;
     extension:     string;
     archivo:       string;
}