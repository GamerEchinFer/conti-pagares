import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import { Box, ThemeProvider } from '@mui/material';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Persistor } from 'redux-persist';
import { theme } from '../../theme/Theme';
import ResponsiveAppBar from '../components/TopBar';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from '../config/Keycloak';
import { persistor, store } from '../redux/store';

import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '../lib/queryClient';
import MainDrawer from '../components/MainDrawer/MainDrawer';
import interceptor from '../config/interceptor';
import ErrorBar from '../components/shared/ErrorBar';
import AuthGDI from '../components/shared/AuthGDI';

export default function App({ Component, pageProps }: AppProps) {
    interceptor();
    return (
        <>
            <Head>
                <title>Carpeta Digital | Banco Continental </title>
            </Head>
            <ReactKeycloakProvider authClient={keycloak as any} initOptions={{ onLoad: 'login-required' }} >
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor as Persistor}>
                        <AuthGDI>
                            <ThemeProvider theme={theme}>
                                <ErrorBar />
                                <div
                                    style={{
                                        display: 'flex',
                                    }}
                                >
                                    <ResponsiveAppBar />
                                    <MainDrawer />
                                    <Box
                                        component="main"
                                        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
                                    >
                                        <QueryClientProvider client={queryClient}>
                                            <Component {...pageProps} />
                                        </QueryClientProvider>

                                    </Box>

                                </div>
                            </ThemeProvider>
                        </AuthGDI>
                    </PersistGate>
                </Provider>
            </ReactKeycloakProvider>
        </>
    )
}
