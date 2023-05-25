import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SubProducto } from "../../interfaces/interfaces";

const initialState = () => ({
    items: [] as SubProducto[],
    loading: false, 
    success: false,
    error: null as any
});

const subProductoSlice = createSlice({
    name: 'subProducto',
    initialState: initialState(),
    reducers: {
        subProductoRequest(state) {
            state.loading = true;
        },
        subProductoSuccess(state, action:PayloadAction<SubProducto[]>) {
            state.items = action.payload;
            state.loading = false;
            state.success = true;
        },
        subProductoError(state, action: PayloadAction<any>) {
            state.loading = false;
            state.success = false;
            state.error = action.payload
        }
    }
})

export const subProductoActions = subProductoSlice.actions

export const subProducto = subProductoSlice.reducer