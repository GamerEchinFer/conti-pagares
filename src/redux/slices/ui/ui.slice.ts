import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UiStateModel } from './index';
import dataErrorResponse from '../../../models/responses/DataError.response';
import ModalParaEntity from '../../../models/entities/ModalPara.Entity';

type uiState = UiStateModel;

const initialState: uiState = {
    loadingIpGeolocation: false,
    loadingToken: false,
    loadingPermisos: false,
    msgError: null,
    dataError: null,
    modalPara: null,
    loadingAgente: false
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
        showLoadingGDI : (state,action:PayloadAction<boolean>) => {
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
        showLoadingAgente : (state,action:PayloadAction<boolean>) => {
            return {
                ...state,
                loadingAgente: action.payload
            } as uiState
        },
    }
  })


export const {
    uiSetError,
    dataError,
    showLoadingIpGeolocation,
    showLoadingToken,
    showLoadingGDI,
    showLoadingPermisos,
    reset,
    modalPara,
    showLoadingAgente
} = uiSlice.actions

export default uiSlice.reducer;