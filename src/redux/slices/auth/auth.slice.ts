import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AuthStateModel from "./auth.state";
import { IpGeolocationResponse } from "../../../models/responses/ipGeolocation.response";

type authState = AuthStateModel;

const initialState: AuthStateModel = {
    cliente: null,
    access_token : null,
    usuarioKeycloack: '',
    ipGeolocation: null  
};

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
});

export const {
    reset,
    datosLogin,
    login,
    getUsuarioKeyCloack,
    getIpGeolocation,

  } = authSlice.actions;

export default authSlice.reducer;
