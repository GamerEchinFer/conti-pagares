import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EtiquetaVariableResponse } from '../../interfaces/interfaces';

interface EtiquetaVariableUpdateFile {
    idTipoDocumento: string,
    file: any,
    base64: string
    base64Modified: string
    totalPages: number,
    size: number,
}

interface EtiquetaVariableUpdateFileModified {
    idTipoDocumento: string,
    base64Modified: string,
    totalPagesModified: number,
    sizeModified: number
}

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
        etiquetaVariableUpdateFile(state, action:PayloadAction<EtiquetaVariableUpdateFile>) {
            state.response = state.response.map(item => {

                if (Number(item.idTipoDocumento) === Number(action.payload.idTipoDocumento)) {
                    item.file = action.payload.file
                    // Cambiar aca segun convenga
                    item.openModal = item.periodicidad === 1
                    item.openModalPeriodo = item.periodicidad === 6
                    item.base64 = action.payload.base64                    
                    item.base64Modified = action.payload.base64 ?? 0     
                    item.totalPages = action.payload.totalPages ?? 0              
                    item.totalPagesModified = action.payload.totalPages ?? 0              
                    item.size = action.payload.size ?? 0              
                }

                return item;
            })
        },
        etiquetaVariableUpdateFileModified(state, action:PayloadAction<EtiquetaVariableUpdateFileModified>) {
            state.response = state.response.map(item => {
                if (Number(item.idTipoDocumento) === Number(action.payload.idTipoDocumento)) {                                                                                
                    item.base64Modified = action.payload.base64Modified
                    item.totalPagesModified = action.payload.totalPagesModified,
                    item.sizeModified = action.payload.sizeModified
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