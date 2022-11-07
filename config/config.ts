let AppConfig = {
    interna: {
        auth:{
            token: '/api/datos/token',
            cliente: '/api/datos/cliente',
            particulares: '/api/datos/particulares',
            laborales: '/api/datos/laborales',
            adicionales: '/api/datos/adicionales',
            adicionalesContacto: '/api/datos/contacto'
        },
        cuentas: {
            solicitudCuenta : '/api/cuenta/solicitud/producto',
        },
        tarjetas: {
            listarTarjetasDisponibles: '/api/tarjetas/tarjetasDisponibles',
        },
        utilitarios: {
            monedas: '/api/utilitarios/monedas',
            paises: '/api/utilitarios/paises',
            ocupaciones: '/api/utilitarios/ocupaciones',
            prefijoCelular: '/api/utilitarios/prefijos/celular',
            prefijoTelefono: '/api/utilitarios/prefijos/telefono',
            departamentos: '/api/utilitarios/departamentos',
            profesiones: '/api/utilitarios/profesiones',
            ciudades: '/api/utilitarios/ciudades',
            barrios: '/api/utilitarios/barrios',
        }
    },
    auth: {
        loginOmnicanal: '/autenticarServicio/v1/realms/interno',
        codigoCliente: '/interno/clientes/datos/v1/${nroDocumento}/codigo/${tipoDocumento}',
        listarDatosAdicionalesContacto: '/interno/clientes/datos/v1/api/contactos?tipoDocumento=CI&nroDocumento=5414375&enmascarar=false',
        listarDatosAdicionalesUsuario: '/interno/clientes/datos/v1/clientes/${codCliente}/datos-adicionales',
        getDatosUserExtra: 'clientes/datos/v1/api/contactos?tipoDocumento=CI&nroDocumento={nroDocumento}&enmascarar=false',
        listarDatosParticulares: '/interno/clientes/datos/v1/${codCliente}/particulares',
        listarDatosLaborales: '/interno/clientes/datos/v1/${codCliente}/laborales',
        actualizarDatosParticulares: '/clientes/datos/v1/api/clientes/particulares',
        actualizarDatosLaborales: '/clientes/datos/v1/api/clientes/laborales',
        reconfirmarDatosUsuario: '/clientes/datos/v1/api/clientes/reconfirmardatos',
        listadoActualizacionDatosPendientes: '/clientes/datos/v1/api/clientes/configuracion-actualizacion?canal=WEB',
        getProducto: 'https://api-test.bancontinental.com.py/gestion-documental-interno/v1/productos'
    },
    cuentas: {
        getCuentas: 'cuentas/v1/api/clientes?principal={principal}&esCuentaNacional={nacional}',
        getExtracto: 'homebanking/extractos/movimientos/v1/api/accounts/{extractoDto.hashCuenta}/transactions/normal?fromDate={extractoDto.desde}&toDate={extractoDto.hasta}',
        getChequeraSucursales: 'chequera/v1/api/listado?Cuenta={cuenta}',
        crearSolicitudChequera: 'chequera/v1/api/solicitud',
        crearSolicitudProducto: 'solicitud/producto/v1/abreviada/insertar',
        getDatosUserExtra: 'clientes/datos/v1/api/contactos?tipoDocumento=CI&nroDocumento={nroDocumento}&enmascarar=false',
        crearPinTemporal: 'tarjeta/debito/v1/CambioPin',
        listadoTarjetaDebito: 'tarjeta/debito/v1/consulta',
        getComprobanteExtractoCuenta: 'homebanking/extractos/movimientos{location}',
        getCuentasInactivas: 'cuentas/v1/inactivas',
        reactivarCuenta: 'cuentas/v1/activar',
        cuentasDesembolso: 'creditos-consulta/v1/api/creditos/desembolsos/cuentas',
        desbloqueoTarjetaDebito: 'tarjeta/debito/v1/desbloquear',
        actualizarDatosCuenta: '/clientes/datos/v1/api/clientes/cuentas'
    },
    tarjetas: {
        /* getTarjetas: '/tarjetas/v2/',
        getContipuntosApi: '/contipuntos/v1/api/clientes',
        postPagoTarjeta: 'tarjetas/creditos/v1/api/pagos',
        getExtracto: '/tarjetas/v2/api/tarjeta-numero/${hash}/extracto-bancario',
        getExtractoPDF: '/tarjetas/v2/api/tarjeta-numero/${hash}/extracto-bancario-pdf?periodo=${periodo}',
        getConfiguracionTarjeta: '/tarjeta/v1/api/configuracion?NumeroTarjeta=${hash}',
        putEstadoTarjeta: '/tarjeta/v1/api/configuracion/estado',
        putPaisTarjeta: '/tarjeta/v1/api/configuracion/pais',
        putLimiteTarjeta: '/tarjeta/v1/api/configuracion/limite',
        putCanalTarjeta: '/tarjeta/v1/api/configuracion/canal',
        putComercioTarjeta: '/tarjeta/v1/api/configuracion/comercio',
        listadoTarjetaCredito: 'api-tarjeta-credito/v1/consulta',
        getTarjetaPreAprobada: '/api-tarjeta-credito/v1/preaprobada/consulta',
        getTarjetaPreAprobadaInformacion: '/api-tarjeta-credito/v1/preaprobada/informacion',
        postTarjetaPreAprobadaRechazada: '/api-tarjeta-credito/v1/preaprobada/rechazar',
        getDatosTarjetaActualizacion: '/clientes/datos/v1/api/clientes/tarjetas',
        postFileTarjetaPreAprobada: '/api-tarjeta-credito/v1/preaprobada/adjuntarArchivo',
        postAutorizarTarjetaPreAprobada: '/api-tarjeta-credito/v1/preaprobada/autorizar',
        reimpresionTD: '/tarjeta/debito/v1/reimprimir',
        reimpresionTC: '/api-tarjeta-credito/v1/reimpresion',
        costoReimpresionTC: '/api-tarjeta-credito/v1/costo-reimpresion',
        costoReimpresionTD: '/tarjeta/debito/v1/costo-reimpresion',
        desbloquearTarjetaCredito: 'api-tarjeta-credito/v1/desbloquear',
        listarDetallesBeneficios: 'finansys/utilitarios/v1/parametros?codigoParametro=85064?codigoDetalle=0',
        //listarDetallesBeneficios: 'finansys/utilitarios/v1/parametros',{headers: {"codigoParametro": "85064", "codigoDetalle": "0"}}
        tarjetaMotorDecision: 'riesgos/scoring/v1/tarjetaonline',
        tarjetasDisponiblesLineaCredito: 'api-tarjeta-credito/v1/solicitud-digital/marcas/{lineacredito}',
        actualizarDatosTarjeta: '/api-tarjeta-credito/v1/ActualizacionDatoExtracto',
        insertarSolicitud: '/solicitud/Producto/v1/tarjeta-credito/insertar',
        getSeguimientoCabecera: '/solicitud/Producto/v1/tarjeta-credito/activa',
        getDetalleCabecera: '/solicitud/Producto/v1/tarjeta-credito/seguimiento?codigoSolicitud=${idSolicitud}', */
        tarjetaMotorDecision: '/riesgos-motor-scoring/v1/tarjetaonline',

    },
    servicios: {
        getServicios: '/servicios-design/v1/servicios',
        getSubServicio: '/servicios-design/v1/servicios/${idServicio}/subservicios',
        getCampos: '/servicios-design/v1/subservicios/${idSubServicio}/campos',
        // getConsulta: '/homebanking/servicios/v1/api/pago/consultas/${IdSubServicio}', NO BORRAR!!!
        getConsulta: '/gateway-hb/v1/api/servicios/pagos/consultas/${IdSubServicio}',
        // pagoServicio: '/homebanking/servicios/v1/api/pagos' NO BORRAR!!!
        pagoServicio: '/gateway-hb/v1/api/pago/servicios',
        getFavoritos: '/servicio-pago-favoritos/v1/api/clientes/servicios/favoritos',
        crearFavorito: '/servicio-pago-favoritos/v1/api/servicios/favoritos',
        deleteFavorito: '/servicio-pago-favoritos/v1/api/servicios/favoritos/${idFavorito}'
    },
    prestamos: {
        getPrestamos: '/homebanking/clientes-creditos/v1/api/creditos-consultas',
        getExtracto: '/homebanking/clientes-creditos/v1/api/creditos/${nroOperacion}',
        postPagoPrestamo: 'credito/v1/api/pago',
        getSolicitudTipoPrestamos: 'api-credito/v1/tipo/credito',
        getSolicitudMoneda: 'finansys/utilitarios/v1/monedas/1988',
        simuladorCredito: 'api-credito/v1/simulador/credito',
        crearSolicitudProducto: '/solicitud/producto/v1/abreviada/insertar',
        prestamoPreAprobado: 'creditos-pre-aprobados/v1/api/listar',
        cuotaPrestamoPreAprobado: 'creditos-pre-aprobados/v1/api/calcular-monto-cuota?Id=${id}&Monto=${monto}',
        solicitarPrestamoPreAprobado: 'creditos-pre-aprobados/v1/api/confirmar',
        obtenerCotizacion: 'operaciondecambio/v1/cotizacion?TipoMoneda=${divisa}&Tipo=${tipo}',
        motorDecision: 'riesgos/scoring/v1/prestamoonline',
        prestamoDigital: 'api-credito/v1/prestamos-digitales/prestamodigital',
        registrarSolicitudPrestamo: 'api-credito/v1/prestamos-digitales/registrar',
        confirmarPrestamoDigital: 'api-credito/v1/prestamos-digitales/confirmar'
    },
    informes: {
        getListaInformes: '/reportes/v1/api/tipos',
        getCamposInformes: '/reportes/v1/api/filtros/campos?IdReporte=${idReporte}',
        getReporteUnificado: '/reportes/v1/api?id-reporte=${idReporte}&tipo-reporte=${TipoReporte}',
        getReportePDF: '/reportes/v1/api?id-reporte=${idReporte}&tipo-reporte=${TipoReporte}',
        getReportePDFsublista: 'reportes/v1/api/subitem/pdf?id-reporte=${idReporte}',
    },
    transferencias: {
        getBeneficiarios: 'transferencias/v1/api/beneficiarios?TipoDestino=TODOS',
        deleteBeneficiario: 'transferencias/v1/api/beneficiarios',
        validarCuentaBeneficiario: 'transferencias/v1/api/beneficiarios/validar?Cuenta=${nroCuenta}',
        crearBeneficiario: 'transferencias/v1/api/beneficiarios',
        listarLimites: 'transferencias/cuentas/v1/api/${cuenta}/limites',
        configurarLimite: 'transferencias/cuentas/v1/api/limites',
        validarTransferenciaNacional: 'transferencias/interbancarias/v1/api/validar',
        crearTransferenciaNacionalApi: 'transferencias/interbancarias/v1/api/crear',
        editarBeneficiario: 'transferencias/v1/api/beneficiarios',
        cotizaciones: 'operaciondecambio/v1/cotizacion?TipoMoneda={TipoMoneda}&Tipo={Tipo}',
        calcularConversion: 'operaciondecambio/v1/calcular',
        configuracionConversion: 'operaciondecambio/v1/configuracion?TipoTransferencia={tipoTransferencia}',
        procesarOperacionOPC: 'operaciondecambio/v1/procesar',
        pagoMatricula: 'transferencias/bcp/v1/matriculas/pagos',
    },
    utilitarios: {
        listarPaises: '/interno/clientes/datos/v1/paises',
        listarOcupaciones: '/finansys/utilitario/interno/v1/ocupaciones',
        listarPrefijoCelular: '/finansys/utilitario/interno/v1/prefijo-celular',
        listarPrefijoTelefono: '/finansys/utilitario/interno/v1/prefijo-linea-baja?pi_codigo=${pi_codigo}',
        listarProfesiones: '/finansys/utilitario/interno/v1/profesiones',
        listarDepartamentos: '/finansys/utilitario/interno/v1/departamentos',
        listarCiudades: '/finansys/utilitario/interno/v1/ciudades/?pais=${CodPais}',
        listarBarrios: '/finansys/utilitario/interno/v1/barrios/?ciudad=${codCiudad}',
        listarMonedas: '/finansys/utilitario/interno/v1/monedas/1989',
        listarEmpresas: '/finansys/utilitario/interno/v1/lugar-laboral?pi_valor=${pi_valor}',

       // getListarPaises: 'transferencia/exterior/v1/api/paises',
        listarBancos: 'transferencias-utilitarios/v2/api/transferencias/entidades',
        listarMotivosBcp: 'transferencias-utilitarios/v2/api/transferencias/motivos',
        obtenerSwiftBancos: 'transferencias-utilitarios/v2/api/transferencias/internacionales/bancos[?codigo]',
        listarMonedasExtranjeras: 'monedas/v1/api/extranjeras',
        apiFechaValor: 'transferencia/exterior/v1/api/fecha-valor',
        accionistas: 'accionistas/v1/obtener-datos',
        maps: 'https://maps.googleapis.com/maps/api/geocode/json?key=${APIKEY}&address=${DIRECCION}',
        formulariosDigitales: '/formulario-digital/v1/authenticate/transitory?searchBy=codigoCliente&formName=autorizacionDeTramitesATerceros',
    },
    transferenciasInternacionales: {
        getListarBeneficiariosInternacionales: 'transferencia/exterior/v1/api/beneficiarios',
        getListarOrigenFondo: 'transferencia/exterior/v1/api/origen-fondos',
        getListarMotivosTransferencias: 'transferencia/exterior/v1/api/motivos',
        postValidarTransferenciaInternacional: 'transferencia/exterior/v1/api/procesar',
        postConfirmarTransferenciaInternacional: 'transferencia/exterior/v1/api/confirmar',
        postCatastroBeneficiarioInternacional: 'transferencia/exterior/v1/api/beneficiarios',
        procesarTrasnferenciaInternacional: 'transferencia/exterior/v1/api/procesar',
        confirmarTransferenciaNacionalApi: 'transferencia/exterior/v1/api/confirmar',
        listarCiudadesPorPais: 'transferencia/exterior/v1/api/ciudades?pais='
    }
}


export const PrenderRefreshToken = false;
export const TiempoMaximoInactividad = 900; //segundos
export const UrlPaginaPublica = "https://www.bancontinental.com.py";
export const UrlPaginaPublicaAnterior = "https://www2.bancontinental.com.py";
export const ApiKeyGoogleCloud = "AIzaSyDDuhrOKU4_d7zGH3rCJ26O-eHc2wH8Qgs";
export default AppConfig;