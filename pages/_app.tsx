import '../styles/globals.scss'
import '../styles/buttons.scss'
import '../styles/containers.scss'
import '../styles/extracto.scss'
import '../styles/login.scss'
import '../styles/materialui.scss'
import '../styles/modal.scss'
import '../styles/styles.scss'

import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material'
import { theme } from '../theme/Theme'
import Head from 'next/head'
import store, { persistor } from '../redux/store';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Persistor } from 'redux-persist'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
           <title>Agentes | Banco Continental </title>
       </Head>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor as Persistor}>
            <Component {...pageProps} />
          </PersistGate>          
        </Provider>        
      </ThemeProvider>
    </>        
  )
}
