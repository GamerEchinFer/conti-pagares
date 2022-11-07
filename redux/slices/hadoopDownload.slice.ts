import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HadoopDirectoRequest } from '../../interfaces/interfaces';
// import { HadoopDirectoResponse } from '../../interfaces/interfaces';

const initialState = () => ({
    items: {} as HadoopDirectoRequest,
    loading: false,
    success: false,
    error: null as any
});

const hadoopDownloadSlice = createSlice({
    name: 'hadoopDownload',
    initialState: initialState(),
    reducers: {
        hadoopDownloadRequest(state) {
            state.loading = true;
        },
        hadoopDownloadSuccess(state, action:PayloadAction<HadoopDirectoRequest>) {
            state.items = action.payload;
            state.loading = false;
            state.success = true;
        },
        hadoopDownloadError(state, action:PayloadAction<any>) {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        }
    }
});

export const hadoopDownloadActions = hadoopDownloadSlice.actions;

export const hadoopDownload = hadoopDownloadSlice.reducer;

