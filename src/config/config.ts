let AppConfig = {
    interna: {
        auth:{
            token: '/api/datos/token',
            cliente: '/api/datos/cliente',
        }
    },
    auth: {
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
    }
}

export default AppConfig;