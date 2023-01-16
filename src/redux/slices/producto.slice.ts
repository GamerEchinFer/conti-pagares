import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Producto } from "../../interfaces/interfaces";

const initialState = () => ({
    items: [] as Producto[],    
    loading: false, //luego de ejecutar is true
    success: false,
    error: null as any
});

const productoSlice = createSlice({
    name: 'producto',
    initialState: initialState(),
    reducers: {
        productoRequest(state) {
            state.loading = true;
        },
        productoSuccess(state, action:PayloadAction<Producto[]>) {
            state.items = action.payload;
            state.loading = false;
            state.success = true;
        },
        productoError(state, action: PayloadAction<any>) {
            state.loading = false;
            state.success = false;
            state.error = action.payload
        }
    }
})

export const productoActions = productoSlice.actions

export const producto = productoSlice.reducer