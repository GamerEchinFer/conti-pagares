import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ParametrosVisibles } from "../../interfaces/interfaces";

const initialState = () => ({
    items: [] as ParametrosVisibles[],
    loading: false, //luego de ejecutar is true
    success: false,
    error: null as any
});

const parametroVisibleSlice = createSlice({
    name: 'parametroVisible',
    initialState: initialState(),
    reducers: {
        parametroVisibleRequest(state) {
            state.loading = true;
        },
        parametroVisibleSuccess(state, action:PayloadAction<ParametrosVisibles[]>) {
            state.items = action.payload;
            state.loading = false;
            state.success = true;
        },
        parametroVisibleError(state, action: PayloadAction<any>) {
            state.loading = false;
            state.success = false;
            state.error = action.payload
        }
    }
})

export const parametroVisibleActions = parametroVisibleSlice.actions

export const parametroVisible = parametroVisibleSlice.reducer