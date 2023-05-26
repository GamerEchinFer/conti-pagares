import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DatosCliente } from "../../interfaces/interfaces";

const initialState = () => ({
    items: [] as DatosCliente[],
    loading: false,
    success: false,
    error: null as any
});

const datosClienteSlice = createSlice({
    name: 'datosCliente',
    initialState: initialState(),
    reducers: {
        datosClienteRequest(state) {
            state.loading = true;
        },
        datosClienteSuccess(state, action :PayloadAction<DatosCliente[]>) {
            state.items = action.payload; 
            state.loading = false;
            state.success = true;
        },
        datosClienteError(state, action :PayloadAction<any>) {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        }
    }
})


export const datosClienteActions = datosClienteSlice.actions;

export const datosCliente = datosClienteSlice.reducer;