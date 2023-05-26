import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TipoBusqueda } from "../../interfaces/interfaces";

const initialState = () => ({
    items: [] as TipoBusqueda[],    
    loading: false, //luego de ejecutar is true
    success: false,
    error: null as any
});

const busquedaSlice = createSlice({
    name: 'busqueda',
    initialState: initialState(),
    reducers: {
        busquedaRequest(state) {
            state.loading = true;
        },
        busquedaSuccess(state, action:PayloadAction<TipoBusqueda[]>) {
            state.items = action.payload;
            state.loading = false;
            state.success = true;
        },
        busquedaError(state, action: PayloadAction<any>) {
            state.loading = false;
            state.success = false;
            state.error = action.payload
        }
    }
})

export const busquedaActions = busquedaSlice.actions

export const busqueda = busquedaSlice.reducer