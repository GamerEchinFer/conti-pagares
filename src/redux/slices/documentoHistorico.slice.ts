import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TipoDocumentoHistoricoResponse } from '../../interfaces/interfaces';

const initialState = () => ({
    items: [] as TipoDocumentoHistoricoResponse[],
    loading: false,
    success: false,
    error: null as any
});

const tipoDocumentoHistoricoSlice = createSlice({
    name: 'tipoDocumentoHistorico',
    initialState: initialState(),
    reducers: {
        tipoDocumentoHistoricoRequest(state) {
            state.loading = true;
        },
        tipoDocumentoHistoricoSuccess(state, action:PayloadAction<TipoDocumentoHistoricoResponse[]>) {
            state.items = action.payload;
            state.loading = false;
            state.success = true;
        },
        tipoDocumentoHistoricoError(state, action: PayloadAction<any>) {
            state.loading = false;
            state.success = false;
            state.error = action.payload
        },
        tipoDocumentoHistoricoReset(state) {
            state.loading = false;
            state.success = false;
            state.items = [];
            state.error = null as any;
        },
    }
})

export const tipoDocumentoHistoricoActions = tipoDocumentoHistoricoSlice.actions

export const tipoDocumentoHistorico = tipoDocumentoHistoricoSlice.reducer