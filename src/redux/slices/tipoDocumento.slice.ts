import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TipoDocumento } from "../../interfaces/interfaces";

const initialState = () => ({
    items: {} as TipoDocumento[],
    loading: false, //luego de ejecutar is true
    success: false,
    error: null as any
});

const tipoDocumentoSlice = createSlice({
    name: 'tipoDocumento',
    initialState: initialState(),
    reducers: {
        tipoDocumentoRequest(state) {
            state.loading = true;
        },
        tipoDocumentoSuccess(state, action:PayloadAction<TipoDocumento[]>) {
            state.items = action.payload;
            state.loading = false;
            state.success = true;
        },
        tipoDocumentoError(state, action: PayloadAction<any>) {
            state.loading = false;
            state.success = false;
            state.error = action.payload
        },
        tipoDocumentoReset(state) {
            state.loading = false;
            state.success = false;
            state.items = [];
            state.error = null as any;
        },
    }
})

export const tipoDocumentoActions = tipoDocumentoSlice.actions

export const tipoDocumento = tipoDocumentoSlice.reducer