import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConsultaDocumentosUser } from "../../interfaces/interfaces";

const initialState = () => ({
    items: {} as ConsultaDocumentosUser,
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
        documentosUserSuccess(state, action:PayloadAction<ConsultaDocumentosUser>) {
            state.items = action.payload;
            state.loading = false;
            state.success = true;
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
            state.items = {} as ConsultaDocumentosUser
        },
    }
})

export const documentosUserActions = documentosUserSlice.actions

export const documentosUser = documentosUserSlice.reducer