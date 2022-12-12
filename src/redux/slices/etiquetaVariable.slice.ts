import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EtiquetaVariableResponse } from '../../interfaces/interfaces';

// MUTABLE
const initialState = () => ({
    response: [] as EtiquetaVariableResponse[],
    loading: false,    
    success: false,
    error: null as any,    
})

interface EtiquetaVariableUpdateFile {
    idTipoDocumento: string,
    file: any,
    base64: string
}

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
        etiquetaVariableUpdateFile(state, action:PayloadAction<EtiquetaVariableUpdateFile>) {
            state.response = state.response.map(item => {

                if (Number(item.idTipoDocumento) === Number(action.payload.idTipoDocumento)) {
                    item.file = action.payload.file
                    // Cambiar aca segun convenga
                    item.openModal = item.periodicidad === 1
                    item.openModalPeriodo = item.periodicidad === 6
                    item.base64 = action.payload.base64                    
                }

                return item;
            })
        },
        etiquetaVariableCloseAllModals(state) {
            state.response = state.response.map(item => {                
                item.openModal = false
                item.openModalPeriodo = false
                return item;
            })
        },
        etiquetaVariableError(state, action: PayloadAction<any>) {
            state.loading = false;
            state.success = false;
            state.error = action.payload
        },
        etiquetaVariableReset(state) {
            state.loading = false;
            state.success = false;            
        },
        setOpenModal(state, action: PayloadAction<boolean>) {
            // state.openModal = action.payload
        }
    }
});

export const etiquetaVariableActions = etiquetaVariableSlice.actions

export const etiquetaVariable = etiquetaVariableSlice.reducer