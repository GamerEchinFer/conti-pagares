// 401 - NO AUTORIZADO NOT AUTHORIZADED

import { AutenticarServicioHeader, AuthHadoop } from "../interfaces/interfaces"

export const baseUrl = process.env.NODE_ENV === "development" ? 
    "http://localhost:3000" : "http://localhost:3000" // configuración de puerto de JSONServer
    // Debe cambiar cuando se realice pase a producción

export const baseUrl2 = process.env.NODE_ENV === "development" ? // configuración de puerto de Base de Datos Oracle
    "https://localhost:5001" : "https//localhost:5001"

export const apiKey = "Ivb2'@sr8|x,3`yv.7YfxNwb#?l8C!"

export const keycloakHeaders: AutenticarServicioHeader = {
    // APIM DESA
    "Client-Id": "gestion-documental",
    "Client-Secret": "157a0c08-bb2e-451d-895d-5a43d90fb3ae",
    "Grant-Type": "client_credentials",
    "Subscription-Key": "cc665137fcfb4a95a0c2701e58828e7c",
    Scope: "profile"
    
    //APIM QA
    // "Client-Id": process?.env?.NEXT_PUBLIC_CLIENTE_ID ?? "",
    // "Client-Secret": "e832dcbc-3de1-4e5e-92d2-ab1d53033753",
    // "Grant-Type": "client_credentials",
    // "Subscription-Key": "578a3e189d3a4da791ad1aa2a00bae3c",
    // Scope: "profile",    
}
export const keyCloakHeadersHadoop : AuthHadoop = {
    "Subscription-Key": "2d489b65ea374662b3c6c6929dd62f9a"
}

