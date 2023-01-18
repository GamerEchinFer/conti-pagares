import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material'
import Head from 'next/head'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Persistor } from 'redux-persist'
import store, { persistor } from '../redux/store'
import { theme } from '../../theme/Theme'
import ResponsiveAppBar from '../components/TopBar'
import interceptors from '../api/interceptors'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import keycloak from '../config/Keycloak'
import ErrorBar from '../components/shared/ErrorBar'
import TipoBusquedaPage from './tipoBusqueda'


export default function App({ Component, pageProps }: AppProps) {
  interceptors();
  return (
    <>
      <Head>
        <title>Carpeta Digital | Banco Continental </title>
       </Head>
       <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <ReactKeycloakProvider authClient={keycloak as any} initOptions={{onLoad: 'login-required'}} >
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor as Persistor}>
              <ThemeProvider theme={theme}>
                  <ErrorBar />
                  <ResponsiveAppBar />
                  <Component {...pageProps} />
              </ThemeProvider>
            </PersistGate>          
          </Provider>
        </ReactKeycloakProvider>      
    </>        
  )
}
