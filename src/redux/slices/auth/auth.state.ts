import { DatosAgenteResponse } from "../../../models/responses";
import IpGeolocationResponse from "../../../models/responses/IpGeolocation.response";
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