import { AxiosRequestConfig } from "axios";
import { keycloakHeaders, keyCloakHeadersHadoop } from "../constants/constants";
import { AuthenticationResponse } from "../interfaces/interfaces";

export const apmAuthInterceptor = (config: AxiosRequestConfig) => {

    const gdiAuth = localStorage.getItem("gdi-auth");

    if (!gdiAuth) {
        return config;
    }

    const values: AuthenticationResponse = JSON.parse(gdiAuth);

    if (!values || !values.access_token) {
        return config;
    }

    if (config.headers) {
        config.headers["Authorization"] = `${values.token_type} ${values.access_token}`;
        config.headers["Subscription-Key"] = keycloakHeaders["Subscription-Key"];
    }

    return config;
}

export const apmAuthInterceptorHadoop = (config: AxiosRequestConfig) => {
    if(config.headers) {
        config.headers["Subscription-Key"] = keyCloakHeadersHadoop["Subscription-Key"];
    }
    return config;
}