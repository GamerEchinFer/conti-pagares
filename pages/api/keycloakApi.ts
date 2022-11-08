import { AxiosResponse } from "axios";
import { authApi } from ".";
import { AutenticarServicioHeader, AuthenticationResponse } from "../../interfaces/interfaces";

export async function postAutenticarServicio(headers: AutenticarServicioHeader) {        
    const {data} = await authApi.post<any, AxiosResponse<AuthenticationResponse>>("/", null, {headers: headers as any});
    
    return data;
}