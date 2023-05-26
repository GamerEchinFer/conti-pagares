import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SolicitudCliente } from "../../interfaces/interfaces";

const initialState = () => ({
    items: [] as SolicitudCliente[],
    loading: false,
    success: false,
    error: null as any,
    page: -1,
    solicitudSelected: null as SolicitudCliente | null,
    idProducto: 0,
    idSubProducto: 0
});

const solicitudSlice = createSlice({
    name: 'solicitud',
    initialState: initialState(),
    reducers: {
        solicitudRequest(state) {
            state.loading = true;
        },
        solicitudSuccess(state, action :PayloadAction<SolicitudCliente[]>) {
            state.items = action.payload;
            state.loading = false;
            state.success = true;
        },
        solicitudError(state, action :PayloadAction<any>) {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        setSolicitudSelected(state, action: PayloadAction<SolicitudCliente | null>) {
            state.solicitudSelected = action.payload;
        },
        setIdProducto(state, action: PayloadAction<number>) {
            state.idProducto = action.payload;
        },
        setIdSubProducto(state, action: PayloadAction<number>) {
            state.idSubProducto = action.payload;
        }
    }
})


export const solicitudActions = solicitudSlice.actions

export const solicitud = solicitudSlice.reducer