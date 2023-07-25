import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CertificacionEstados } from "../../interfaces/interfaces";

const initialState = () => ({
    items: [] as CertificacionEstados[],    
    loading: false,
    success: false,
    error: null as any
});

const certificacionEstadosSlice = createSlice({
    name: 'certificacionEstados',
    initialState: initialState(),
    reducers: {
        certificacionEstadosRequest(state) {
            state.loading = true;
        },
        certificacionEstadosSuccess(state, action:PayloadAction<CertificacionEstados[]>) {
            state.items = action.payload;
            state.loading = false;
            state.success = true;
        },
        certificacionEstadosError(state, action: PayloadAction<any>) {
            state.loading = false;
            state.success = false;
            state.error = action.payload
        }
    }
})

export const certificacionEstadosActions = certificacionEstadosSlice.actions

export const certificacionEstados = certificacionEstadosSlice.reducer