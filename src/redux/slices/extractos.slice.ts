import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlzarArchivoResponse } from '../../interfaces/interfaces';

const initialState = () => ({
    alzarArchivoResponse: {} as AlzarArchivoResponse,
    descargarArchivoResponse: "" as string,

    alzarArchivoLoading: false, //luego de ejecutar is true
    alzarArchivoSuccess: false,
    alzarArchivoError: null as any,

    descargarArchivoLoading: false, //luego de ejecutar is true
    descargarArchivoSuccess: false,
    descargarArchivoError: null as any    
});

const extractosSlice = createSlice({
    name: 'extractos',
    initialState: initialState(),
    reducers: {
        alzarArchivoRequest(state) {
            state.alzarArchivoLoading = true;
        },
        alzarArchivoSuccess(state, action :PayloadAction<AlzarArchivoResponse>) {
            state.alzarArchivoResponse = action.payload; //JSON or APIRest response.data
            state.alzarArchivoLoading = false;
            state.alzarArchivoSuccess = true;
        },
        alzarArchivoError(state, action :PayloadAction<any>) {
            state.alzarArchivoLoading = false;
            state.alzarArchivoSuccess = false;
            state.alzarArchivoError = action.payload;
        },
        descargarArchivoRequest(state) {
            state.descargarArchivoLoading = true;
        },
        descargarArchivoSuccess(state, action :PayloadAction<string>) {
            state.descargarArchivoResponse = action.payload; //JSON or APIRest response.data
            state.descargarArchivoLoading = false;
            state.descargarArchivoSuccess = true;
        },
        descargarArchivoError(state, action :PayloadAction<any>) {
            state.descargarArchivoLoading = false;
            state.descargarArchivoSuccess = false;
            state.descargarArchivoError = action.payload;
        }
    }
})


export const extractosActions = extractosSlice.actions;

export const extractos = extractosSlice.reducer;