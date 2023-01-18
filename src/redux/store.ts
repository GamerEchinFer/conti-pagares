import { Action, configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk, { ThunkAction } from 'redux-thunk';
import reducer from './reducer';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { useDispatch } from 'react-redux';
import authSlice from './slices/auth/auth.slice';
import { solicitud } from './slices/solicitud.slice';
import { producto } from './slices/producto.slice';
import { clienteDatos } from './slices/clienteDatos.slice';
import { clienteDocumento } from './slices/clienteDocumento.slice';
import { datosCliente } from './slices/datosCliente.slice';
import { etiquetaVariable } from './slices/etiquetaVariable.slice';
import { guardarDocumento } from './slices/guardarDocumento.slice';
import { hadoopDirecto } from './slices/hadoop.slice';
import { hadoopDownload } from './slices/hadoopDownload.slice';
import { numeroLegajo } from './slices/numeroLegajo.slice';
import { parametro } from './slices/parametro.slice';
import { parametroVisible } from './slices/parametroVisible.slice';
import { subProducto } from './slices/subProducto.slice';
import { tipoDocumento } from './slices/tipoDocumento.slice';
import uiSlice from './slices/ui/ui.slice';
import { busqueda } from './slices/busqueda.slice';

const persistConfig = {
  key: 'root',
  storage
}

const combinedReducers = combineReducers({
  auth: authSlice,
  ui: uiSlice,
  solicitud,
  producto : producto,
  subProducto: subProducto,
  datosCliente: datosCliente,
  parametroVisible,
  parametro: parametro,
  etiquetaVariable,
  hadoopDirecto,
  hadoopDownload,
  clienteDatos,
  guardarDocumento,
  clienteDocumento: clienteDocumento,
  numeroLegajo: numeroLegajo,
  tipoDocumento: tipoDocumento,
  busqueda: busqueda
  
})

export type OurStore = ReturnType<typeof combineReducers>

const persistedReducer = persistReducer(persistConfig, combinedReducers)

export const store = configureStore ({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware( 
      {
        thunk:false, 
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      })
      .concat(thunk)
});


export let persistor = typeof window !== 'undefined' && persistStore(store)

export const useAppDispatch: () => AppDispatch = useDispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;

