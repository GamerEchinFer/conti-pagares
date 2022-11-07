import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Parametros } from "../../interfaces/interfaces";

export type ParametrosSelect = {[key: string]: Parametros[]}

const initialState = () => ({
    items: [] as Parametros[],
    loading: false, //luego de ejecutar is true
    success: false,
    error: null as any,
    parametrosSelect : {} as ParametrosSelect,
});

const parametroSlice = createSlice({
    name: 'parametro',
    initialState: initialState(),
    reducers: {
        parametroRequest(state) {
            state.loading = true;
        },
        parametroSuccess(state, action:PayloadAction<ParametrosSelect>) {
            state.parametrosSelect = {...action.payload}
            state.loading = false;
            state.success = true;
        },
        parametroError(state, action: PayloadAction<any>) {
            state.loading = false;
            state.success = false;
            state.error = action.payload
        }
    }
})

export const parametroActions = parametroSlice.actions

export const parametro = parametroSlice.reducer