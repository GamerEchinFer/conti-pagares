import { PromissoryNotesConsult } from "../models/responses/promissoryNotes";
import { TValues } from "./_common";

export interface DataTablePromissotyNotesConsult {
    id: number;
    operacion: string;
    cuota: number;
    moneda: string;
    nroEnvio: number;
    codigo: string;
    nroDocumento: string;
    cliente: string;
    fechaDigitalizacion: string;
}

export interface PromissoryNotesConsultDelivery extends PromissoryNotesConsult {
    subRows?: PromissoryNotesConsult[];
}

export interface PromissoryNotesItemCard {
    codClient: string;
    nroEnvio: string;
    operacion: string;
    fecha: string;
    observacion: string;
}

export enum EPromissoryNotesStatus {
    Shipment = "envio",
    Request = "solicitud",
    Reception = "recepcion",
    Return = "devolucion",
    ReceptionCust = "recepcionCustodia",
    Reject = "rechazo",
    Delivery = "entrega",
}
export interface PromissoryNotesStatusHistory {
    status: EPromissoryNotesStatus;
    createdAt: string;
    branch?: string;
    area?: string;
    user: string;
}

export interface ClienteRetiraDatos {
    tipoDocumento: string;
    codigoCliente: string;
    nombreCliente: string;
}

export interface PromissoryNotesDeliveryState {
    showFormModal: boolean;
    showPdfModal: boolean;
    showAttachModal: boolean;
    promissoryNotesConsultDelivery: PromissoryNotesConsult[];
    promissoryNotesForm: PromissoryNotesConsult[];
    promissoryNoteObservation: string;
    sending: boolean;
    clienteRetira: ClienteRetiraDatos;
    digitalizadoCompleto: boolean;
}



export interface PromissoryNotesDeliveryPdfColumns {
    label: string;
    width?: number;
}
