import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DocumentosUsuarioResponse } from '../../interfaces/interfaces';
import { DocumentoUsuarioResult } from '../../helpers/documentUserMapper';

const initialState = () => ({
    items: undefined as DocumentosUsuarioResponse | undefined,
    itemsMapped: undefined as DocumentoUsuarioResult | undefined,
    loading: false,
    success: false,
    error: null as any
});

const documentosUserSlice = createSlice({
    name: 'documentosUser',
    initialState: initialState(),
    reducers: {
        documentosUserRequest(state) {
            state.loading = true;
        },
        documentosUserSuccess(state, action:PayloadAction<{items: DocumentosUsuarioResponse, itemsMapped: DocumentoUsuarioResult}>) {
            state.items = action.payload.items;
            state.itemsMapped = action.payload.itemsMapped;
            state.loading = false;
            state.success = true;
        },
        setItemsMapped(state, action:PayloadAction<DocumentoUsuarioResult>) {            
            state.itemsMapped = action.payload;            
        },
        documentosUserError(state, action: PayloadAction<any>) {
            state.loading = false;
            state.success = false;
            state.error = action.payload
        },
        documentosUserReset(state) {
            state.loading = false;
            state.success = false;
            state.error = null as any;
            state.items = undefined
        },
    }
})

export const documentosUserActions = documentosUserSlice.actions

export const documentosUser = documentosUserSlice.reducer