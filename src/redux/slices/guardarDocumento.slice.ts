import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GuardarDocumentoResponse } from '../../interfaces/interfaces';

// MUTABLE
const initialState = () => ({
    response: {} as GuardarDocumentoResponse,
    loading: false,    
    success: false,
    error: null as any,
})


const guardarDocumentoSlice = createSlice({
    name: 'guardarDocumento',
    initialState: initialState(),
    reducers: {
        guardarDocumentoRequest(state) {
            state.loading = true;
        },
        guardarDocumentoSuccess(state, action:PayloadAction<GuardarDocumentoResponse>) {
            state.response = action.payload;
            state.loading = false;
            state.success = true;
        },
        guardarDocumentoError(state, action: PayloadAction<any>) {
            state.loading = false;
            state.success = false;
            state.error = action.payload
        },
    }
});

export const guardarDocumentoActions = guardarDocumentoSlice.actions

export const guardarDocumento = guardarDocumentoSlice.reducer