import { DatosAgenteResponse, IpGeolocationResponse, PermisosUsuarioResponse } from "../../../models/responses";

interface AuthStateModel {
    idDispositivo: string;
    access_token: string | null;
    codigoCliente: string | null;
    permisosUsuario: PermisosUsuarioResponse[];
    usuarioKeycloack : string;
    ipGeolocation: IpGeolocationResponse | null;
    datosAgente: DatosAgenteResponse | null;
}

export default AuthStateModel;