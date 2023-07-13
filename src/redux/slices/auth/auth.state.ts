import { DatosAgenteResponse, DatosUsuarioResponse, IpGeolocationResponse, PermisosUsuarioResponse } from "../../../models/responses";

interface AuthStateModel {
    idDispositivo: string;
    cliente: string | null;
    access_token: string | null;
    codigoCliente: string | null;
    datosBasicos: DatosUsuarioResponse | null;
    permisosUsuario: PermisosUsuarioResponse[];
    usuarioKeycloack : string;
    ipGeolocation: IpGeolocationResponse | null;
    datosAgente: DatosAgenteResponse | null;
}

export default AuthStateModel;