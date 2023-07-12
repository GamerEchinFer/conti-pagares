import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ModalParaEntity from '../../../models/entities/ModalPara.Entity';
import { dataErrorResponse } from '../../../models/responses';
import { UiStateModel } from './index';

type uiState = UiStateModel;

const initialState: uiState = {
    msgError: null,
    dataError: null,
    modalPara: null,
    loadingIpGeolocation: false,
    loadingToken: false,
    loadingAgente: false,
    loadingPermisos: false,
    loadingCodigoCliente: false,
    loadingDatosBasicos: false,
}

 const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        reset: () => initialState,
        uiSetError : (state,action:PayloadAction<string | null>) => {
            return {
                ...state,
                msgError: action.payload
            } as uiState
        },
        dataError : (state,action:PayloadAction<dataErrorResponse | null>) => {
            return {
                ...state,
                dataError: action.payload
            } as uiState
        },
        modalPara : (state,action:PayloadAction<ModalParaEntity | null>) => {
            return {
                ...state,
                modalPara: action.payload
            } as uiState
        },
        showLoadingIpGeolocation : (state,action:PayloadAction<boolean>) => {
            return {
                ...state,
                loadingIpGeolocation: action.payload
            }
        },
        showLoadingToken : (state,action:PayloadAction<boolean>) => {
            return {
                ...state,
                loadingToken: action.payload
            } as uiState
        },
        showLoadingAgente : (state,action:PayloadAction<boolean>) => {
            return {
                ...state,
                loadingAgente: action.payload
            } as uiState
        },
        showLoadingPermisos : (state,action:PayloadAction<boolean>) => {
            return {
                ...state,
                loadingPermisos: action.payload
            } as uiState
        },
        showLoadingCodigoCliente : (state,action:PayloadAction<boolean>) => {
            return {
                ...state,
                loadingCodigoCliente: action.payload
            } as uiState
        },
    },
  })


export const {
    uiSetError,
    dataError,
    modalPara,
    showLoadingIpGeolocation,
    showLoadingToken,
    showLoadingAgente,
    showLoadingPermisos,
    showLoadingCodigoCliente,
    reset
} = uiSlice.actions

export default uiSlice.reducer;