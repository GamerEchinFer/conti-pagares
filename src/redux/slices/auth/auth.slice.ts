import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IpGeolocationResponse from "../../../models/responses/ipGeolocation.response";
import AuthStateModel from "./auth.state";

type authState = AuthStateModel;

const initialState: AuthStateModel = {
    cliente: null,
    access_token : null,
    codigoCliente: null,
    permisosUsuario: [],
    usuarioKeycloack: '',
    ipGeolocation: null,
    datosAgente: null,
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: () => initialState,
        datosLogin : (state:authState,action:PayloadAction<string | null>) => {
            return {
                ...state,
                cliente: action.payload
            } as authState;
        },
        login : (state:authState,action:PayloadAction<string | null>) => {
            return {
                ...state,
                access_token: action.payload
            } as authState;
        },
       
        getCodigoCliente : (state,action:PayloadAction<string>) => {
            return {
                ...state,
                codigoCliente: action.payload
            }
        },
        getUsuarioKeyCloack : (state,action:PayloadAction<string>) => {
            return {
                ...state,
                usuarioKeycloack: action.payload
            } as authState;
        },
        getIpGeolocation : (state,action:PayloadAction<IpGeolocationResponse | null>) => {
            return {
                ...state,
                ipGeolocation: action.payload
            } as authState;
        },
       
    },
})

export const {
    reset,
    datosLogin,
    login,
    getCodigoCliente,
    getUsuarioKeyCloack,
    getIpGeolocation,
  } = authSlice.actions

export default authSlice.reducer;
