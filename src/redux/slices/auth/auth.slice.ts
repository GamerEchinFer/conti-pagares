import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import AuthStateModel from "./auth.state";

// type authState = AuthStateModel;

// const initialState: AuthStateModel = {
//     cliente: null,
//     access_token : null,
//     datosAdicionales : null,
//     datosClientesParticulares : null,
//     datosClientesLaborales : null,
//     codigoCliente: null,
//     datosAdicionalesContacto: null,
//     datosPendientesActualizacion: null,
//     datosBasicos: null,
//     permisosUsuario: [],
//     usuarioKeycloack: '',
//     ipGeolocation: null,
//     marcasPla: [],
//     datosAgente: null,
// // }


// const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {
//         reset: () => initialState,
//         datosLogin : (state:authState,action:PayloadAction<string | null>) => {
//             return {
//                 ...state,
//                 cliente: action.payload
//             } as authState;
//         },
//         login : (state:authState,action:PayloadAction<string | null>) => {
//             return {
//                 ...state,
//                 access_token: action.payload
//             } as authState;
//         },
//         getDatosAdicionales : (state,action:PayloadAction<DatosAdicionalesResponse>) => {
//             return {
//                 ...state,
//                 datosAdicionales: action.payload
//             } as authState;
//         },
//         getDatosClientesParticulares : (state,action:PayloadAction<DatosClientesParticularesResponse>) => {
//             return {
//                 ...state,
//                 datosClientesParticulares: action.payload
//             } as authState;
//         },
//         getDatosClientesLaborales : (state,action:PayloadAction<DatosClientesLaboralesResponse>) => {
//             return {
//                 ...state,
//                 datosClientesLaborales: action.payload
//             } as authState
//         },
//         getCodigoCliente : (state,action:PayloadAction<string>) => {
//             return {
//                 ...state,
//                 codigoCliente: action.payload
//             }
//         },
//         getDatosAdicionalesContacto : (state,action:PayloadAction<DatosUsuarioAdicionalResponse>) => {
//             return {
//                 ...state,
//                 datosAdicionalesContacto: action.payload
//             }
//         },
//         getDatosActualizacionPendientes : (state,action:PayloadAction<ActualizacionDatosPendienteResponse>) => {
//             return {
//                 ...state,
//                 datosPendientesActualizacion: action.payload
//             } as authState;
//         },
//         getDatosBasicos : (state,action:PayloadAction<DatosUsuarioResponse>) => {
//             return {
//                 ...state,
//                 datosBasicos: action.payload
//             } as authState;
//         },
//         getPermisosUsuario : (state,action:PayloadAction<PermisosUsuarioResponse[]>) => {
//             return {
//                 ...state,
//                 permisosUsuario: action.payload
//             } as authState;
//         },
//         getUsuarioKeyCloack : (state,action:PayloadAction<string>) => {
//             return {
//                 ...state,
//                 usuarioKeycloack: action.payload
//             } as authState;
//         },
//         getIpGeolocation : (state,action:PayloadAction<IpGeolocationResponse | null>) => {
//             return {
//                 ...state,
//                 ipGeolocation: action.payload
//             } as authState;
//         },
//         getMarcasPla : (state,action:PayloadAction<MarcasPlaResponse[]>) => {
//             return {
//                 ...state,
//                 marcasPla: action.payload
//             } as authState;
//         },
//         getDatosAgente : (state,action:PayloadAction<DatosAgenteResponse>) => {
//             return {
//                 ...state,
//                 datosAgente: action.payload
//             } as authState;
//         },
       
//     },
// })

// export const {
//     reset,
//     datosLogin,
//     login,
//     getDatosAdicionales,
//     getDatosClientesParticulares,
//     getDatosClientesLaborales,
//     getCodigoCliente,
//     getDatosAdicionalesContacto,
//     getDatosActualizacionPendientes,
//     getDatosBasicos,
//     getPermisosUsuario,
//     getUsuarioKeyCloack,
//     getIpGeolocation,
//     getMarcasPla,
//     getDatosAgente,
//   } = authSlice.actions

// export default authSlice.reducer;
