import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MsFileStreamResponse} from '../../interfaces/interfaces';

const initialState = () => ({
    response: {} as MsFileStreamResponse,
    loading: false,
    success: false,
    error: null as any,
    files: null as any,
})

const msFileStreamSlice = createSlice({
    name: 'msFileStream',
    initialState: initialState(),
    reducers: {
      msFileStreamRequest(state) {
        state.loading = true;   
      },
      msFileStreamSuccess(state,action: PayloadAction<any>) {
        state.response = action.payload;
        state.loading = false;
        state.success = true;  
      },
      msFileStreamError(state, action: PayloadAction<any>) {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      },
      msFileStreamReset(state) {
        state.loading = false;
        state.success = false;
      },
      setFiles(state, action: PayloadAction<any>) {
        state.files = action.payload
      }

    }
});

export const msFileStreamActions = msFileStreamSlice.actions;

export const msFileStream = msFileStreamSlice.reducer;