import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import reducer from './reducer';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, combineReducers({...reducer}))

const store = configureStore ({
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

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;

