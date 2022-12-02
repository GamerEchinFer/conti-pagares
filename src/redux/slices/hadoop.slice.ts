import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HadoopDirectoResponse} from '../../interfaces/interfaces';


const initialState = () => ({
    response: {} as HadoopDirectoResponse,
    loading: false,
    success: false,
    error: null as any,
    files: [] as any[],
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
      setFiles(state, action: PayloadAction<any[]>) {
        state.files = action.payload
      }

    }
});

export const hadoopDirectoActions = hadoopDirectoSlice.actions;

export const hadoopDirecto = hadoopDirectoSlice.reducer;