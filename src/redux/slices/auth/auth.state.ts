import { DatosAgenteResponse } from "../../../models/responses";
import PermisosUsuarioResponse from "../../../models/responses/PermisosUsuario.response";
import { IpGeolocationResponse } from "../../../models/responses/ipGeolocation.response";

interface AuthStateModel {
    idDispositivo: string;
    access_token: string | null;
    datosAgente: DatosAgenteResponse | null;
    codigoCliente: string | null;
    permisosUsuario: PermisosUsuarioResponse[];
    usuarioKeycloack : string;
    ipGeolocation: IpGeolocationResponse | null;
}

export default AuthStateModel;