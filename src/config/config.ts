import { logsEvents, modulos } from "../helpers/enums";

export const ConfigApiExterna = {
    auth: {
        token: '/autenticarServicio/v1/realms/interno',
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