import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PeriodicidadTipoDocumento } from "../../interfaces/interfaces";

const initialState = () => ({
    items: [] as PeriodicidadTipoDocumento[],
    loading: false,
    success: false,
    error: null as any
});

const periodicidadSlice = createSlice({
    name: 'periodicidad',
    initialState: initialState(),
    reducers: {
        periodicidadRequest(state) {
            state.loading = true;
        },
        periodicidadSuccess(state, action:PayloadAction<PeriodicidadTipoDocumento[]>) {
            state.items = action.payload;
            state.loading = false;
            state.success = true;
        },
        periodicidadError(state, action: PayloadAction<any>) {
            state.loading = false;
            state.success = false;
            state.error = action.payload
        }
    }
})

export const periodicidadActions = periodicidadSlice.actions

export const periodicidad = periodicidadSlice.reducer