import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ClienteDatos } from "../../interfaces/interfaces";

const initialState = () => ({
    // items: {tipoPersona: "J", codigoCliente: "123"} as ClienteDatos,
    items: {} as ClienteDatos,
    loading: false, //luego de ejecutar is true
    success: false,
    error: null as any
});

const clienteDatosSlice = createSlice({
    name: 'clienteDatos',
    initialState: initialState(),
    reducers: {
        clienteDatosRequest(state) {
            state.loading = true;
        },
        clienteDatosSuccess(state, action:PayloadAction<ClienteDatos>) {
            state.items = action.payload;
            state.loading = false;
            state.success = true;
        },
        clienteDatosError(state, action: PayloadAction<any>) {
            state.loading = false;
            state.success = false;
            state.error = action.payload
        },
        clienteDatosReset(state) {
            state.loading = false;
            state.success = false;
            state.error = null as any;
            state.items = {} as ClienteDatos
        },
    }
})

export const clienteDatosActions = clienteDatosSlice.actions

export const clienteDatos = clienteDatosSlice.reducer