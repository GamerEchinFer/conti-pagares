import { DatosAgenteResponse, IpGeolocationResponse } from "../../../models/responses";
import PermisosUsuarioResponse from "../../../models/responses/PermisosUsuario.response";

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