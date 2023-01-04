import dataErrorResponse from "../../../models/responses/DataError.response";

interface UiStateModel {
    loadingMonedas:                             boolean,
    loadingMotorDesiciones:                     boolean,
    loadingTarjetaDisponible:                   boolean,
    loadingCreditoCuentaDesembolso:             boolean,
    loadingTarjetaDisponibleSeleccionada:       boolean,
    loadingSolicitudTarjetaDigital:             boolean,
    loadingPaises:                              boolean,
    loadingCiudades:                            boolean,
    loadingBarrios:                             boolean,
    loadingPrefijoTelefono:                     boolean,
    loadingPrefijoCelular:                      boolean,
    loadingActualizacionDatos:                  boolean,
    loadingValidarDatosCliente:                 boolean,
    loadingEmpresas:                            boolean,
    loadingOcupaciones:                         boolean,
    loadingProfesiones:                         boolean,
    loadingDepartamentos:                       boolean,
    msgError:                                   string | null,
    loadingSolicitarCuenta:                     boolean,
    loadingDatosParticulares:                   boolean,
    loadingDatosLaborales:                      boolean,
    dataError:                                  dataErrorResponse |  null, 
    loadingListadoMarcas:                       boolean;
    loadingDatosAdicionales:                    boolean;
    loadingToken:                               boolean;
    loadingAgente:                              boolean;
    loadingPermisos:                            boolean;
    modalPara:                                  string,
    loadingIpGeolocation:                       boolean,
    loadingCodigoCliente:                       boolean,
    loadingTipoDocumento:                       boolean;
    loadingCotizacion:                          boolean;
    loadingDatosBasicos:                        boolean;
    loadingCuentaActualizacion:                 boolean;
    loadingObjetivosAhorro:                     boolean;
    loadingCuentas:                             boolean;
    loadingSolicitudAhorroProgramado:           boolean;
}

export default UiStateModel;
