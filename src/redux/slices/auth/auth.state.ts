import IpGeolocationResponse from "../../../models/responses/ipGeolocation.response";
interface AuthStateModel {
    cliente: string | null;
    access_token: string | null;
    usuarioKeycloack : string;
    ipGeolocation: IpGeolocationResponse | null;
}

export default AuthStateModel;
