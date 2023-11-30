import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HadoopDirectoResponse} from '../../interfaces/interfaces';
import { RootState } from '../store';

const initialState = () => ({
    response: {} as HadoopDirectoResponse,
    loading: false,
    success: false,
    error: null as any,
    files: null as any,
})

const hadoopDirectoSlice = createSlice({
    name: 'hadoopDirecto',
    initialState: initialState(),
    reducers: {
      hadoopDirectoRequest(state) {
        state.loading = true;   
      },
      hadoopDirectoSuccess(state,action: PayloadAction<any>) {
        state.response = action.payload;
        state.loading = false;
        state.success = true;  
      },
      hadoopDirectoError(state, action: PayloadAction<any>) {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      },
      hadoopDirectoReset(state) {
        state.loading = false;
        state.success = false;
      },
      setFiles(state, action: PayloadAction<any>) {
        state.files = action.payload
      }

    }
});

export const hadoopDirectoActions = hadoopDirectoSlice.actions;

export const hadoopDirecto = hadoopDirectoSlice.reducer;

export const hadoopDirectoSelectors = {
  selectResponse: (state: RootState) => state.hadoopDirecto.response,
  selectLoading: (state: RootState) => state.hadoopDirecto.loading,
  selectSuccess: (state: RootState) => state.hadoopDirecto.success,
  selectError: (state: RootState) => state.hadoopDirecto.error,
  selectFiles: (state: RootState) => state.hadoopDirecto.files,
}