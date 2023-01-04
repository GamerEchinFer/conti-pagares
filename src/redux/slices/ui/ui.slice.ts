import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import dataErrorResponse from '../../../models/responses/DataError.response';
import { UiStateModel } from './index';

type uiState = UiStateModel;

const initialState: uiState = {
    loadingMonedas: false,
    loadingMotorDesiciones: false,
    loadingTarjetaDisponible: false,
    loadingTarjetaDisponibleSeleccionada: false,
    loadingCreditoCuentaDesembolso: false,
    loadingSolicitudTarjetaDigital: true,
    loadingPaises:  false,
    loadingActualizacionDatos: false,
    loadingBarrios: false,
    loadingCiudades: false,
    loadingPrefijoTelefono: false,
    loadingValidarDatosCliente: false,
    loadingEmpresas: false,
    loadingDepartamentos: false,
    loadingOcupaciones: false,
    loadingPrefijoCelular: false,
    loadingProfesiones: false,
    msgError: null,
    loadingSolicitarCuenta: false,
    loadingDatosParticulares: false,
    loadingDatosLaborales: false,
    dataError: null,
    modalPara: '',
    loadingIpGeolocation: false,
    loadingListadoMarcas: false,
    loadingDatosAdicionales: false,
    loadingToken: false,
    loadingAgente: false,
    loadingPermisos: false,
    loadingCodigoCliente: false,
    loadingTipoDocumento: false,
    loadingCotizacion:false,
    loadingDatosBasicos: false,
    loadingCuentaActualizacion: false,
    loadingObjetivosAhorro:false,
    loadingCuentas:false,
    loadingSolicitudAhorroProgramado:false,
}

 const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        reset: () => initialState,
        showLoadingMonedas : (state,action:PayloadAction<boolean>) => {
            return {
                ...state,
                loadingMonedas: action.payload
            } as uiState;
        },
        showLoadingMotorDesiciones : (state,action:PayloadAction<boolean>) => {
            return {
                ...state,
                loadingMotorDesiciones: action.payload
            } as uiState;
        },
        showLoadingTarjetaDisponible : (state,action:PayloadAction<boolean>) => {
            return {
                ...state,
                loadingTarjetaDisponible: action.payload
            } as uiState;
        },
        showLoadingTarjetaDisponibleSeleccionada : (state,action:PayloadAction<boolean>) => {
            return {
                ...state,
                loadingTarjetaDisponibleSeleccionada: action.payload
            } as uiState;
        },
        showLoadingCreditoCuentaDesembolso : (state,action:PayloadAction<boolean>) => {
            return {
                ...state,
                loadingCreditoCuentaDesembolso: action.payload
            } as uiState;
        },
        showLoadingSolicitudTarjetaDigital : (state,action:PayloadAction<boolean>) => {
            return {
                ...state,
                loadingSolicitudTarjetaDigital: action.payload
            } as uiState;
        },
        showLoadingPaises: (state,action:PayloadAction<boolean>) => {
            return {
                ...state,
                loadingPaises: action.payload
            }
        },
        showLoadingActualizacionDatos : (state,action:PayloadAction<boolean>) => {
            return {
                ...state,
                loadingActualizacionDatos: action.payload
            }
        },
        showLoadingBarrios : (state,action:PayloadAction<boolean>) => {
            return {
                ...state,
                loadingBarrios: action.payload
            }
        },
        showLoadingCiudades : (state,action:PayloadAction<boolean>) => {
            return {
                ...state,
                loadingCiudades: action.payload
            }
        },
        showLoadingPrefijoTelefono : (state,action:PayloadAction<boolean>) => {
            return {
                ...state,
                loadingPrefijoTelefono: action.payload
            }
        },
        showLoadingValidarDatosCliente : (state,action:PayloadAction<boolean>) => {
            return {
                ...state,
                loadingValidarDatosCliente: action.payload
            }
        },
        showLoadingEmpresas : (state,action:PayloadAction<boolean>) => {
            return {
                ...state,
                loadingEmpresas: action.payload
            }
        },
        showLoadingDepartamentos : (state,action:PayloadAction<boolean>) => {
            return {
                ...state,
                loadingDepartamentos: action.payload
            }
        },
        showLoadingOcupaciones : (state,action:PayloadAction<boolean>) => {
            return {
                ...state,
                loadingOcupaciones: action.payload
            }
        },
        showLoadingPrefijoCelular : (state,action:PayloadAction<boolean>) => {
            return {
                ...state,
                loadingPrefijoCelular: action.payload
            }
        },
        showLoadingProfesiones : (state,action:PayloadAction<boolean>) => {
            return {
                ...state,
                loadingProfesiones: action.payload
            }
        },
        uiSetError : (state,action:PayloadAction<string | null>) => {
            return {
                ...state,
                msgError: action.payload
            } as uiState
        },
        showLoadingSolicitarCuenta : (state,action:PayloadAction<boolean>) => {
            return {
                ...state,
                loadingSolicitarCuenta: action.payload
            }
        },
        showLoadingDatosParticulares : (state,action:PayloadAction<boolean>) => {
            return {
                ...state,
                loadingDatosParticulares: action.payload
            }
        },
        showLoadingDatosLaborales : (state,action:PayloadAction<boolean>) => {
            return {
                ...state,
                loadingDatosLaborales: action.payload
            }
        },
        dataError : (state,action:PayloadAction<dataErrorResponse | null>) => {
            return {
                ...state,
                dataError: action.payload
            } as uiState
        },
        modalPara : (state,action:PayloadAction<string>) => {
            return {
                ...state,
                modalPara: action.payload
            } as uiState
        },
        showLoadingIpGeolocation : (state,action:PayloadAction<boolean>) => {
            return {
                ...state,
                loadingIpGeolocation: action.payload
            }
        },
        showLoadingListadoMarcas : (state,action:PayloadAction<boolean>) => {
            return {
                ...state,
                loadingListadoMarcas: action.payload
            } as uiState
        },
        showLoadingDatosAdicionales : (state,action:PayloadAction<boolean>) => {
            return {
                ...state,
                loadingDatosAdicionales: action.payload
            } as uiState
        },
        showLoadingToken : (state,action:PayloadAction<boolean>) => {
            return {
                ...state,
                loadingToken: action.payload
            } as uiState
        },
        showLoadingAgente : (state,action:PayloadAction<boolean>) => {
            return {
                ...state,
                loadingAgente: action.payload
            } as uiState
        },
        showLoadingPermisos : (state,action:PayloadAction<boolean>) => {
            return {
                ...state,
                loadingPermisos: action.payload
            } as uiState
        },
        showLoadingCodigoCliente : (state,action:PayloadAction<boolean>) => {
            return {
                ...state,
                loadingCodigoCliente: action.payload
            } as uiState
        },
        showLoadingTipoDocumento : (state,action:PayloadAction<boolean>) => {
            return {
                ...state,
                loadingTipoDocumento: action.payload
            } as uiState
        },
        showLoadingCotizacion : (state,action:PayloadAction<boolean>) => {
            return {
                ...state,
                loadingCotizacion: action.payload
            }
        },
        showLoadingDatosBasicos : (state,action:PayloadAction<boolean>) => {
            return {
                ...state,
                loadingDatosBasicos: action.payload
            } as uiState
        },
        showLoadingCuentaActualizacion : (state,action:PayloadAction<boolean>) => {
            return {
                ...state,
                loadingCuentaActualizacion: action.payload
            } as uiState
        },
        showLoadingObjetivosAhorroProgramado : (state,action:PayloadAction<boolean>) => {
            return {
                ...state,
                loadingObjetivosAhorro: action.payload
            } as uiState
        },
        showLoadingCuentas : (state,action:PayloadAction<boolean>) => {
            return {
                ...state,
                loadingCuentas: action.payload
            } as uiState
        },
        showLoadingSolicitudAhorroProgramado : (state,action:PayloadAction<boolean>) => {
            return {
                ...state,
                loadingCuentasAhorro: action.payload
            } as uiState
        },
    },
  })


export const {
    showLoadingMonedas,
    showLoadingMotorDesiciones,
    showLoadingTarjetaDisponible,
    showLoadingTarjetaDisponibleSeleccionada,
    showLoadingCreditoCuentaDesembolso,
    showLoadingSolicitudTarjetaDigital,
    showLoadingActualizacionDatos,
    showLoadingBarrios,
    showLoadingCiudades,
    showLoadingPaises,
    showLoadingPrefijoTelefono,
    showLoadingValidarDatosCliente,
    showLoadingEmpresas,
    showLoadingDepartamentos,
    showLoadingOcupaciones,
    showLoadingPrefijoCelular,
    showLoadingProfesiones,
    uiSetError,
    showLoadingSolicitarCuenta,
    showLoadingDatosParticulares,
    showLoadingDatosLaborales,
    dataError,
    modalPara,
    showLoadingIpGeolocation,
    showLoadingListadoMarcas,
    showLoadingDatosAdicionales,
    showLoadingToken,
    showLoadingAgente,
    showLoadingPermisos,
    showLoadingCodigoCliente,
    showLoadingTipoDocumento,
    showLoadingCotizacion,
    showLoadingDatosBasicos,
    showLoadingCuentaActualizacion,
    showLoadingObjetivosAhorroProgramado,
    showLoadingCuentas,
    showLoadingSolicitudAhorroProgramado,
    reset
} = uiSlice.actions

export default uiSlice.reducer;