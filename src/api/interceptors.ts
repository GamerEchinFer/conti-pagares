import { AxiosRequestConfig } from "axios";
import { keycloakHeaders } from "../constants/constants";
import { store } from "../redux/store";

export const apmAuthInterceptor = (config: AxiosRequestConfig) => {

    const gdiAuth = store.getState().authGDI.gdiAuth    
    

    if (!gdiAuth || !gdiAuth.access_token) {
        return config;
    }

    if (config.headers) {
        config.headers["Authorization"] = `${gdiAuth.token_type} ${gdiAuth.access_token}`;
        config.headers["Subscription-Key"] = keycloakHeaders["Subscription-Key"];
    }

    return config;
}
