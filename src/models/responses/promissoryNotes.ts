interface PromissoryNotesCustomer {
    tipoDocumento: string;
    codigoCliente: string;
    nombreCliente: string;
}

interface PromissoryNotesRequest {
    nombreSucursal: string | null;
    areaSolicitud: string | null;
    nombreUsuario: string | null;
    fechaSolicitud: string | null;
}

interface PromissoryNotesReception {
    fechaRecepcion: string;
    nombreUsuario: string;
    areaRecepcion: string;
}

interface PromissoryNotesShipment {
    nombreSucursal: string;
    areaEnvio: string;
    nombreUsuario: string;
    fechaEnvio: string;
}

interface PromissoryNotesConsultDelivery {
    nombreClienteEntrega: string;
    nombreUsuario: string;
    fechaEntrega: string;
}

interface PromissoryNotesReturn {
    nombreUsuario: string;
    fechaDevolucion: string;
}

interface PromissoryNotesReceptionCust {
    nombreUsuario: string;
    fechaRecepcionCustodia: string;
}

interface PromissoryNotesReject {
    nombreUsuario: string;
    fechaRechazo: string;
}

export interface PromissoryNotesConsult {
    operacion: string;
    numeroEnvio: string;
    cuota: string;
    fechaVencimiento: string;
    estado: string;
    observacion: string;
    nombreClienteRecibe: string;
    monto: number;
    cliente: PromissoryNotesCustomer;
    solicitud: PromissoryNotesRequest;
    recepcion: PromissoryNotesReception;
    envio: PromissoryNotesShipment;
    devolucion: PromissoryNotesReturn;
    recepcionCustodia: PromissoryNotesReceptionCust;
    entrega: PromissoryNotesConsultDelivery;
    rechazo: PromissoryNotesReject;
    parent?:string;
}

export interface PromissoryNotesFolderDocument {
    codigoCliente: string;
    nombre: string;
    caracter: string;
    documento: string;
    tipoDocumento: string;
    idProducto: string;
    producto: string;
    idSubproducto: number;
    subproducto: string;
    idTipodocumento: number;
    idGrupo: string;
    idDocumento: string;
    grupo: string;
    fechaDocumento: string;
    fechaVencimiento: string;
    operacion: string;
    obligatorio: string;
    idLegajo: string;
    codigoEstado: string;
    rutaDocumento: string;
    esRelacionable: string;
    cantidadOperacionesRelacionables: string;
    clasificacionDocumento: string;
    grupoSubproducto: string;
    descripcionGrupoSubproducto: string;
    estado: string;
    documentoDisponibleRelacionar: string;
    tiempoVencimiento: string;
}

export interface PromissoryNotesDelivery {
    operacion: string;
    cuota: string;
    fechaVencimiento: string;
    estado: string;
    observacion: string;
    nombreClienteRecibe: string;
    monto: number;
}


export interface PromissoryNotesDownloadFile {
    datosArchivo: string;
}