import DatosAgenteResponse from "../../../models/responses/DatosAgente.response";
import IpGeolocationResponse from "../../../models/responses/ipGeolocation.response";
import PermisosUsuarioResponse from "../../../models/responses/PermisosUsuario.response";

interface AuthStateModel {
    cliente: string | null;
    access_token: string | null;
    codigoCliente: string | null;
    permisosUsuario: PermisosUsuarioResponse[];
    usuarioKeycloack : string;
    ipGeolocation: IpGeolocationResponse | null;
    datosAgente: DatosAgenteResponse | null;

}

export default AuthStateModel;
