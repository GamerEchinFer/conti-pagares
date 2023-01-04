let AppConfig = {
    interna: {
        auth:{
            token: '/api/datos/token',
            cliente: '/api/datos/cliente',
            asignarMarcaPLA: '/api/datos/actualizacion/marca',
            producto: '/api/datos/producto',
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
        loginGDI: '/autenticarServicio/v1/realms/interno',
        datosAgente: '/api-usuarios/v1/usuarios/${usuario}',
        permisosUsuario: '/finansys-admin/v1/usuarios/${usuario}/permisos/urls?aplicacion=FSYS-WEB',
        getProducto: '/gestion-documental-interno/v1/productos',
        getSubproducto:'/gestion-documental-interno/v1/subproductos',
        getTipoDocumentos: '/gestion-documental-interno/v1/tipos-documentos',
        getParametros: '/gestion-documental-interno/v1/parametros',
        getParametrosVisibles: '/gestion-documental-interno/v1/parametros-visibles',
        getNumeroLegajo: '/gestion-documental-interno/v1/numero-legajo',
        postGuardarHistorialUsuario: '/gestion-documental-interno/v1/guardar-historial-usuario',
        postGuardarDocumento: '/gestion-documental-interno/v1/guardar-documento',
        postChecklist: '/gestion-documental-interno/v1/checklist',
        getClienteCodigo: '/interno/clientes/datos/v1/clientes',
        getClienteNroDocumento: '/interno/clientes/datos/v1/clientes/datos?numeroDocumento',
        listarMarcasPLA: '/api-pla/v1/alertas/marcaspla/${codCliente}',
        asignarMarcaPLA: '/api-pla/v1/alertas/asignarMarca',
        ipGeolocation: 'https://api.ipgeolocation.io/ipgeo?apiKey=5edeb9b31aae4818af7f4003f1d72b4f',
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
    }
}

export default AppConfig;