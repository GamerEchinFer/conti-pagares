import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TipoDocumento } from "../../interfaces/interfaces";
import { RootState } from "../../redux/store";
import { ClienteRetiraDatos, PromissoryNotesConsultDelivery, PromissoryNotesDeliveryState } from "../../interfaces/promissoryNotes";
import { PromissoryNotesConsult } from "../../models/responses/promissoryNotes";
import { promissoryNotesHelper } from "../../helpers/promissoryNotes";

const initialState = () => ({
    showFormModal: false,
    showPdfModal: false,
    showAttachModal: false,
    promissoryNotesConsultDelivery: [],
    promissoryNotesForm: [],
    promissoryNoteObservation: '',
    sending: false,
    clienteRetira: {
        tipoDocumento: '',
        codigoCliente: '',
        nombreCliente: '',
    },
    digitalizadoCompleto: false,
} as PromissoryNotesDeliveryState);

const { findByRowId } = promissoryNotesHelper;

export interface NotesFormItemPayload {
    id: string,
    promissoryNotesConsult: PromissoryNotesConsult,
}

const tipoDocumentoSlice = createSlice({
    name: 'promissoryNotesDelivery',
    initialState: initialState(),
    reducers: {
        setFormShowModal(state, action: PayloadAction<boolean>) {
            state.showFormModal = action.payload;
        },
        setPdfShowModal(state, action: PayloadAction<boolean>) {
            state.showPdfModal = action.payload;
        },
        setAttachShowModal(state, action: PayloadAction<boolean>) {
            state.showAttachModal = action.payload;
        },
        setSending(state, action: PayloadAction<boolean>) {
            state.sending = action.payload;
        },
        setClienteRetira(state, action: PayloadAction<ClienteRetiraDatos>) {
            state.clienteRetira = action.payload;
        },
        setPromissoryNotesConsultDelivery(state, action: PayloadAction<PromissoryNotesConsult[]>) {
            state.promissoryNotesConsultDelivery = action.payload;
        },
        setPromissoryNotesForm(state, action: PayloadAction<PromissoryNotesConsult[]>) {
            state.promissoryNotesForm = action.payload;
        },
        setPromissoryNotesFormItem(state, action: PayloadAction<NotesFormItemPayload>) {
            const { id, promissoryNotesConsult } = action.payload;
            const currentState = [...state.promissoryNotesForm];
            const row = findByRowId(currentState, id);
            if (row) {
                row.observacion = promissoryNotesConsult.observacion;
                row.nombreClienteRecibe = promissoryNotesConsult.nombreClienteRecibe;
            }

            state.promissoryNotesForm = [...state.promissoryNotesForm];
        },
        setPromissoryNoteObservation(state, action: PayloadAction<string>) {
            console.log("action.payload", action.payload);
            state.promissoryNoteObservation = action.payload;
        },
        setDigitalizadoCompleto(state, action: PayloadAction<boolean>) {
            state.digitalizadoCompleto = action.payload;
        },
        setResetDatos(state) {
            state.showFormModal = false;
            state.showPdfModal = false;
            state.showAttachModal = false;
            state.promissoryNotesConsultDelivery = [];
            state.promissoryNotesForm = [];
            state.promissoryNoteObservation = '';
            state.sending = false;
            state.clienteRetira = {
                tipoDocumento: '',
                codigoCliente: '',
                nombreCliente: '',
            };
            state.digitalizadoCompleto = false;
        }
    }
})

export const promissoryNotesDeliveryActions = tipoDocumentoSlice.actions

export const promissoryNotesDelivery = tipoDocumentoSlice.reducer

export const promissoryNotesSelectors = {
    getFormShowModal: (state: RootState) => state.promissoryNotesdelivery.showFormModal,
    getPdfShowModal: (state: RootState) => state.promissoryNotesdelivery.showPdfModal,
    getAttachShowModal: (state: RootState) => state.promissoryNotesdelivery.showAttachModal,
    getSending: (state: RootState) => state.promissoryNotesdelivery.sending,
    getPromissoryNotesConsultDelivery: (state: RootState) => state.promissoryNotesdelivery.promissoryNotesConsultDelivery,
    getPromissoryNotesForm: (state: RootState) => state.promissoryNotesdelivery.promissoryNotesForm,
    getPromissoryNotesFormById: (state: RootState, id: string) => {
        const row = findByRowId(state.promissoryNotesdelivery.promissoryNotesForm, id);
        return row;
    },
    getPromissoryNoteObservation: (state: RootState) => state.promissoryNotesdelivery.promissoryNoteObservation,
    getClienteRetira: (state: RootState) => state.promissoryNotesdelivery.clienteRetira,
    getDigitalizadoCompleto: (state: RootState) => state.promissoryNotesdelivery.digitalizadoCompleto,
}