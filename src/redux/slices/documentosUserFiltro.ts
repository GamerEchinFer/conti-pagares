import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DocumentosUsuarioFiltro } from "../../interfaces/interfaces";

const initialState = () => ({
    items: undefined as DocumentosUsuarioFiltro | undefined,
    loading: false,
    success: false,
    error: null as any
});

const documentosUserFiltroSlice = createSlice({
    name: 'documentosUserFiltro',
    initialState: initialState(),
    reducers: {
        documentosUserFiltroRequest(state) {
            state.loading = true;
        },
        documentosUserFiltroSuccess(state, action:PayloadAction<DocumentosUsuarioFiltro>) {
            state.items = action.payload;
            state.loading = false;
            state.success = true;
        },
        documentosUserFiltroError(state, action: PayloadAction<any>) {
            state.loading = false;
            state.success = false;
            state.error = action.payload
        },
        documentosUserFiltroReset(state) {
            state.loading = false;
            state.success = false;
            state.error = null as any;
            state.items = undefined
        },
    }
})

export const documentosUserFiltroActions = documentosUserFiltroSlice.actions

export const documentosUserFiltro = documentosUserFiltroSlice.reducer