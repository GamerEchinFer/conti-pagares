import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthenticationResponse } from "../../../interfaces/interfaces";

const initialState = () => ({
    gdiAuth: undefined as AuthenticationResponse | undefined, 
    loading: false   
});

const authGDISlice = createSlice({
    name: 'auth-gdi',
    initialState: initialState(),
    reducers: {        
        requestAuth(state) {
            state.loading = true;            
        },                   
        setAuth(state, action:PayloadAction<AuthenticationResponse | undefined>) {
            state.loading = false;
            state.gdiAuth = {...action.payload};
        },                   
    },
})

export const authGDIActions = authGDISlice.actions;

export default authGDISlice.reducer;
