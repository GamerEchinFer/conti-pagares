import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Condiciones, GuardarHistorialUsuarioRequest } from "../../interfaces/interfaces";

const initialState = () => ({
    response: {} as GuardarHistorialUsuarioRequest[],
    loading: false,
    success: false,
    error: null as any,
condicionesGuardarHistorial: null as Condiciones | null
})

const guardarHistorialUsuarioSlice = createSlice({
    name: 'guardarHistorialUsuarioSlice',
    initialState: initialState(),
    reducers: {
        guardarHistorialUsuarioRequest(state) {
            state.loading = true;
        },
        guardarHistorialUsuarioSuccess(state, action: PayloadAction<GuardarHistorialUsuarioRequest[]>) {

        }
    }
})

export const {
    guardarHistorialUsuarioRequest,
    guardarHistorialUsuarioSuccess
  } = guardarHistorialUsuarioSlice.actions

export default guardarHistorialUsuarioSlice.reducer;