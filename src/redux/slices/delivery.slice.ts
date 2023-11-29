import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TipoDocumento } from "../../interfaces/interfaces";
import { RootState } from "../../redux/store";
import { PromissoryNotesConsultDelivery, PromissoryNotesDeliveryState } from "../../interfaces/promissoryNotes";

const initialState = () => ({
    showFormModal: false,
    showPdfModal: false,
    promissoryNotesConsultDelivery: [],
} as PromissoryNotesDeliveryState);

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
        setPromissoryNotesConsultDelivery(state, action: PayloadAction<PromissoryNotesConsultDelivery[]>) {
            state.promissoryNotesConsultDelivery = action.payload;
        },
    }
})

export const promissoryNotesDeliveryActions = tipoDocumentoSlice.actions

export const promissoryNotesDelivery = tipoDocumentoSlice.reducer

export const promissoryNotesSelectors = {
    getFormShowModal: (state: RootState) => state.promissoryNotesdelivery.showFormModal,
    getPdfShowModal: (state: RootState) => state.promissoryNotesdelivery.showPdfModal,
    getPromissoryNotesConsultDelivery: (state: RootState) => state.promissoryNotesdelivery.promissoryNotesConsultDelivery,
}