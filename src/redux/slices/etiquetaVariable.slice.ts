import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EtiquetaVariableResponse, EtiquetaVariableBody } from '../../interfaces/interfaces';

interface EtiquetaVariableUpdateFile {
    idTipoDocumento: string,
    file: any,
    base64: string
    base64Modified: string
    totalPages: number,
    size: number,
    filename?: string
}

interface EtiquetaVariableUpdateFileModified {
    idTipoDocumento: string,
    base64Modified: string,
    totalPagesModified: number,
    sizeModified: number
}

interface EtiquetaVariableSetOpenModalView {
    idTipoDocumento: string,
    openModalView: boolean
}

interface OpenModalConsultaDocumentos {
    idTipoDocumento: string,
    openModalConsultaDocumentos: boolean
}

// MUTABLE
const initialState = () => ({
    response: [] as EtiquetaVariableResponse[],
    loading: false,    
    success: false,
    error: null as any,
    page: -1,
    etiquetaVariableBody: null as EtiquetaVariableBody | null
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
                    item.openModal = item.periodicidad === 1
                    item.openModalPeriodo = item.periodicidad === 6
                    item.openModalView = item.tieneDocumento === true
                    item.base64 = action.payload.base64                    
                    item.base64Modified = action.payload.base64 ?? 0     
                    item.totalPages = action.payload.totalPages ?? 0              
                    item.totalPagesModified = action.payload.totalPages ?? 0              
                    item.size = action.payload.size ?? 0              
                    item.filename = action.payload.filename ?? "Test"     
                }

                return item;
            })
        },
        etiquetaVariableUpdateFileModified(state, action:PayloadAction<EtiquetaVariableUpdateFileModified>) {
            state.response = state.response.map(item => {
                if (Number(item.idTipoDocumento) === Number(action.payload.idTipoDocumento)) {                                                                                
                    item.base64Modified = action.payload.base64Modified ?? 0
                    item.totalPagesModified = action.payload.totalPagesModified ?? 0,
                    item.sizeModified = action.payload.sizeModified ?? 0
                }

                return item;
            })
        },
        etiquetaVariableCloseAllModals(state) {
            state.response = state.response.map(item => {                
                item.openModal = false
                item.openModalPeriodo = false
                item.openModalView = false
                item.openModalConsultaDocumentos = false
                return item;
            })
        },
        etiquetaVariableError(state, action: PayloadAction<any>) {
            state.loading = false;
            state.success = false;
            state.error = action.payload
        },

        setPage(state, action: PayloadAction<number>){
            state.page = action.payload;
        },

        etiquetaVariableReset(state) {
            state.loading = false;
            state.success = false;            
        },
        etiquetaVariableResponseReset(state) {
            state.response = []         
        },
        setOpenModal(state, action: PayloadAction<boolean>) {},
        setEtiquetaVariableBody(state, action: PayloadAction<EtiquetaVariableBody>) {
            state.etiquetaVariableBody = action.payload
        },
        setOpenModalView(state, action:PayloadAction<EtiquetaVariableSetOpenModalView>) {                                                                  
            state.response = state.response.map(item => {

                if (Number(item.idTipoDocumento) === Number(action.payload.idTipoDocumento)) {                    
                    item.openModalView = action.payload.openModalView                  
                }
                return item;
            })            
        },
        setOpenModalConsultaDocumentos(state, action: PayloadAction<OpenModalConsultaDocumentos>) {
            state.response = state.response.map(item => {
                if(Number(item.idTipoDocumento) === Number(action.payload.idTipoDocumento)) {
                    item.openModalConsultaDocumentos = action.payload.openModalConsultaDocumentos
                }
                return item;
            })
        },
        etiquetaVariableBodyReset(state) {
            state.etiquetaVariableBody = null
        },

        etiquetaVariableAppend(state, action: PayloadAction<EtiquetaVariableResponse>) {
            state.response = [...state.response, {...action.payload}]
        }

    }
});

export const etiquetaVariableActions = etiquetaVariableSlice.actions

export const etiquetaVariable = etiquetaVariableSlice.reducer