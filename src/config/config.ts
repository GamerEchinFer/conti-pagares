import { logsEvents, modulos } from "../helpers/enums";

export const ConfigApiExterna = {
    auth: {
        token: '/autenticarServicio/v1/realms/interno',
        productos: '/gestion-documental-interno/v1/productos',
        subProductos: '/gestion-documental-interno/v1/subproductos/${idProducto}',
        tipoDocumentos: '/gestion-documental-interno/v1/tipos-documentos',
        parametros: '/gestion-documental-interno/v1/parametros/${tipo}',
        parametrosVisibles: '/gestion-documental-interno/v1/parametros-visibles/${idProducto,idSubProducto}',
        numeroLegajo: '/gestion-documental-interno/v1/numeroLegajo/${nextSequence}',
        guardarHistorialUsuario: '/gestion-documental-interno/v1/guardar-historial-usuario',
        guardarDocumento: '/gestion-documental-interno/v1/guardar-documento',
        checklist: '/gestion-documental-interno/v1/checklist',
        clientePorCodigo: '/interno/clientes/datos/v1/clientes/${codigoCliente}',
        clientePorNumeroDoc: '/interno/clientes/datos/v1/clientes/datos/${numeroDocumento}',
        documentosUsuario: '/gestion-documental-interno/v1/documentos-usuario/${codigoCliente}',
        tipoDocHistorico: '/gestion-documental-interno/v1/tipo-documento-historico/${codigoCliente, codigoTipoDocumento}',
        solicitudCliente: '/gestion-documental-interno/v1/menus-frontEnd/solicitud-cliente',
        tipoBusqueda: '/gestion-documental-interno/v1/menus-frontEnd/tipo-busqueda',
        hadoopDescargar: 'https://desa-docker01.bancontinental.com.py:8200/download/${downloadpath}',
        hadoopSubir: 'https://desa-docker01.bancontinental.com.py:8200/upload/${path_images,overwrite,chunk_size:chunksize}',
        permisosUsuario: '/finansys-admin/v1/usuarios/${usuario}/permisos/urls?aplicacion=FSYS-WEB',
        ipGeolocation: 'https://api.ipgeolocation.io/ipgeo?apiKey=5edeb9b31aae4818af7f4003f1d72b4f',
    }
}

export const ConfigApiInterna = {
    auth: {
        token: '/api/datos/token',
        permisosUsuario: '/api/datos/permisos',
        ipGeolocation: '/api/datos/geolocalizacion',
    },
}

export const Logs = {
    auth:[
        {
            tipoEvento: logsEvents.Transaccional,
            evento: 'Token',
            modulo: modulos.Auth,
            urlInterna: ConfigApiInterna.auth.token,
            urlExterna: ConfigApiExterna.auth.token
        },
        {
            tipoEvento: logsEvents.Transaccional,
            evento: 'Permisos de Usuario',
            modulo: modulos.Auth,
            urlInterna: ConfigApiInterna.auth.permisosUsuario,
            urlExterna: ConfigApiExterna.auth.permisosUsuario
        },
        {
            tipoEvento: logsEvents.Transaccional,
            evento: 'Geolocalización',
            modulo: modulos.Auth,
            urlInterna: ConfigApiInterna.auth.ipGeolocation,
            urlExterna: ConfigApiExterna.auth.ipGeolocation
        },
    ],
}