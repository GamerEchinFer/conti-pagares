import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SolicitudCliente } from "../../interfaces/interfaces";

const initialState = () => ({
    items: [] as SolicitudCliente[],
    loading: false, //luego de ejecutar is true
    success: false,
    error: null as any
});

const solicitudSlice = createSlice({
    name: 'solicitud',
    initialState: initialState(),
    reducers: {
        solicitudRequest(state) {
            state.loading = true;
        },
        solicitudSuccess(state, action :PayloadAction<SolicitudCliente[]>) {
            state.items = action.payload; //JSON or APIRest response.data
            state.loading = false;
            state.success = true;
        },
        solicitudError(state, action :PayloadAction<any>) {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        }
    }
})


export const solicitudActions = solicitudSlice.actions

export const solicitud = solicitudSlice.reducer