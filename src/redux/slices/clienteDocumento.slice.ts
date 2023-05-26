import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ClienteDocumento } from "../../interfaces/interfaces";

const initialState = () => ({
    items: {} as ClienteDocumento,
    loading: false,
    success: false,
    error: null as any
});

const clienteDocumentoSlice = createSlice({
    name: 'clienteDocumento',
    initialState: initialState(),
    reducers: {
        clienteDocumentoRequest(state) {
            state.loading = true;
        },
        clienteDocumentoSuccess(state, action:PayloadAction<ClienteDocumento>) {
            state.items = action.payload;
            state.loading = false;
            state.success = true;
        },
        clienteDocumentoError(state, action: PayloadAction<any>) {
            state.loading = false;
            state.success = false;
            state.error = action.payload
        },
        clienteDocumentoReset(state) {
            state.loading = false;
            state.success = false;
            state.error = null as any;
            state.items = {} as ClienteDocumento
        },
    }
})

export const clienteDocumentoActions = clienteDocumentoSlice.actions

export const clienteDocumento = clienteDocumentoSlice.reducer