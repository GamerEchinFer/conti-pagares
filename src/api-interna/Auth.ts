import axios from "axios";
import AppConfig from "../config/config";
import LoginResponse from "../models/responses/Login.response";

const {auth} = AppConfig.interna;

export const apiTokenInterna = async () => {
    const datosToken = await axios.post<LoginResponse>(auth.token);
    if (datosToken){
        if (datosToken.status === 204) {
            return null;
        }
        if (datosToken.status >= 400) {
            return null ;
        }
        return datosToken.data;
    }
    return null;
}

