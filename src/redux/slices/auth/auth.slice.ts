import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AuthStateModel from "./auth.state";
import PermisosUsuarioResponse from "../../../models/responses/PermisosUsuario.response";
import { IpGeolocationResponse } from "../../../models/responses/ipGeolocation.response";

type authState = AuthStateModel;

const initialState: AuthStateModel = {
    idDispositivo: '',
    access_token : null,
    codigoCliente: '',
    permisosUsuario: [],
    usuarioKeycloack: '',
    ipGeolocation: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            return {
                ...initialState,
                idDispositivo:state.idDispositivo,
            }
        },
        datosDispositivo : (state,action:PayloadAction<string>) => {
            return {
                ...state,
                idDispositivo: action.payload
            } as authState;
        },
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
        getPermisosUsuario : (state,action:PayloadAction<PermisosUsuarioResponse[]>) => {
            return {
                ...state,
                permisosUsuario: action.payload
            } as authState;
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
    datosDispositivo,
    datosLogin,
    login,
    getPermisosUsuario,
    getUsuarioKeyCloack,
    getIpGeolocation,
  } = authSlice.actions

export default authSlice.reducer;
