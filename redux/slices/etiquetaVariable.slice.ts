import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EtiquetaVariableResponse } from '../../interfaces/interfaces';

// MUTABLE
const initialState = () => ({
    response: [] as EtiquetaVariableResponse[],
    loading: false,    
    success: false,
    error: null as any,
})


const etiquetaVariableSlice = createSlice({
    name: 'etiquetaVariable',
    initialState: initialState(),
    reducers: {
        etiquetaVariableRequest(state) {
            state.loading = true;
        },
        etiquetaVariableSuccess(state, action:PayloadAction<EtiquetaVariableResponse[]>) {
            state.response = action.payload;
            state.loading = false;
            state.success = true;
        },
        etiquetaVariableError(state, action: PayloadAction<any>) {
            state.loading = false;
            state.success = false;
            state.error = action.payload
        },
        etiquetaVariableReset(state) {
            state.loading = false;
            state.success = false;            
        }
    }
});

export const etiquetaVariableActions = etiquetaVariableSlice.actions

export const etiquetaVariable = etiquetaVariableSlice.reducer