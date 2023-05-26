import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NumeroLegajo } from "../../interfaces/interfaces";

const initialState = () => ({
    items: [] as NumeroLegajo[],
    loading: false,
    success: false,
    error: null as any
});

const numeroLegajoSlice = createSlice({
    name: 'numeroLegajo',
    initialState: initialState(),
    reducers: {
        numeroLegajoRequest(state) {
            state.loading = true;
        },
        numeroLegajoSuccess(state, action:PayloadAction<NumeroLegajo[]>) {
            state.items = action.payload;
            state.loading = false;
            state.success = true;
        },
        numeroLegajoError(state, action: PayloadAction<any>) {
            state.loading = false;
            state.success = false;
            state.error = action.payload
        }
    }
})

export const numeroLegajoActions = numeroLegajoSlice.actions

export const numeroLegajo = numeroLegajoSlice.reducer