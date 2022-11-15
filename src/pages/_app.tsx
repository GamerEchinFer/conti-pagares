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


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Carpeta Digital | Banco Continental </title>
       </Head>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor as Persistor}>
            <ResponsiveAppBar />
            <Component {...pageProps} />
          </PersistGate>          
        </Provider>        
      </ThemeProvider>
    </>        
  )
}
