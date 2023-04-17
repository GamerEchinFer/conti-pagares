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
import { useEffect } from 'react';
import { postAutenticarServicio } from '../api/keycloakApi'
import { keycloakHeaders } from '../constants/constants'
import { getTipoBusqueda } from '../api/apmDesaApi'

const expires_in = 300


export default function App({ Component, pageProps }: AppProps) {
  interceptors();

  useEffect(() => {

    postAutenticarServicio(keycloakHeaders).then((value) => {  
      const miliseconds = new Date().getTime()
      localStorage.setItem("gdi-auth-date", miliseconds.toString())          
      localStorage.setItem("gdi-auth", JSON.stringify(value));
    })

    const interval = setInterval(() => {
      const date = localStorage.getItem("gdi-auth-date")  
      if (!date) { return; }

      const milisecond = Number(date) + (1000 * expires_in)
      const actual = new Date().getTime()

      if (actual >= milisecond) {
        postAutenticarServicio(keycloakHeaders).then((value) => {  
          const miliseconds = new Date().getTime()
          localStorage.setItem("gdi-auth-date", miliseconds.toString())          
          localStorage.setItem("gdi-auth", JSON.stringify(value));
        })
      }      
    }, 1000 * expires_in)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Carpeta Digital | Banco Continental </title>
       </Head>
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
