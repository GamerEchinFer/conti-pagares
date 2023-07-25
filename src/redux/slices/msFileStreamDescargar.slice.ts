import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MsFileStreamRequest } from '../../interfaces/interfaces';

const initialState = () => ({
    items: {} as MsFileStreamRequest,
    loading: false,
    success: false,
    error: null as any,
    response: null as any
});

const msFileStreamDescargarSlice = createSlice({
    name: 'msFileStreamDescargar',
    initialState: initialState(),
    reducers: {
        msFileStreamDescargarRequest(state) {
            state.loading = true;
        },
        msFileStreamDescargarSuccess(state, action:PayloadAction<MsFileStreamRequest>) {
            state.items = action.payload;
            state.loading = false;
            state.success = true;
        },
        msFileStreamDescargarError(state, action:PayloadAction<any>) {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        },
        setFiles(state, action: PayloadAction<any>) {
        state.response = action.payload
        }
    }
});

export const msFileStreamDescargarActions = msFileStreamDescargarSlice.actions;

export const msFileStreamDescargar = msFileStreamDescargarSlice.reducer;

