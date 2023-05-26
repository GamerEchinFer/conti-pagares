import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Persistor } from 'redux-persist';
import { theme } from '../../theme/Theme';
import ResponsiveAppBar from '../components/TopBar';
import interceptors from '../api/interceptors';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from '../config/Keycloak';
import ErrorBar from '../components/shared/ErrorBar';
import { persistor, store } from '../redux/store';
import AuthGDI from '../components/shared/AuthGDI';

export default function App({ Component, pageProps }: AppProps) {
  interceptors();  

  return (
    <>
      <Head>
        <title>Carpeta Digital | Banco Continental </title>
       </Head>
        <ReactKeycloakProvider authClient={keycloak as any} initOptions={{onLoad: 'login-required'}} >
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor as Persistor}>
              <AuthGDI>
                <ThemeProvider theme={theme}>
                  <ErrorBar />
                  <ResponsiveAppBar />
                  <Component {...pageProps} />
                </ThemeProvider>
              </AuthGDI>
            </PersistGate>          
          </Provider>
        </ReactKeycloakProvider>      
    </>        
  )
}