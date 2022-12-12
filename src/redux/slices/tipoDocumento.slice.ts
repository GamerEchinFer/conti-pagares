import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TiposDocumentos } from "../../interfaces/interfaces";

const initialState = () => ({
    items: [] as TiposDocumentos[],
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
        tipoDocumentoSuccess(state, action:PayloadAction<TiposDocumentos[]>) {
            state.items = action.payload;
            state.loading = false;
            state.success = true;
        },
        tipoDocumentoError(state, action: PayloadAction<any>) {
            state.loading = false;
            state.success = false;
            state.error = action.payload
        }
    }
})

export const tipoDocumentoActions = tipoDocumentoSlice.actions

export const tipoDocumento = tipoDocumentoSlice.reducer