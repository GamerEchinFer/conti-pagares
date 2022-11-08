// 401 - NO AUTORIZADO NOT AUTHORIZADED

import { AutenticarServicioHeader, AuthHadoop } from "../interfaces/interfaces"

export const baseUrl = process.env.NODE_ENV === "development" ? 
    "http://localhost:9000" : "http://localhost:9000" // configuración de puerto de JSONServer
    // Debe cambiar cuando se realice pase a producción

export const baseUrl2 = process.env.NODE_ENV === "development" ? // configuración de puerto de Base de Datos Oracle
    "https://localhost:5001" : "https//localhost:5001"

export const apiKey = "Ivb2'@sr8|x,3`yv.7YfxNwb#?l8C!"

export const keycloakHeaders: AutenticarServicioHeader = {
    "Client-Id": "gestion-documental",
    "Client-Secret": "b982b8f1-5b10-44cb-a595-8e49f46e29a7",
    "Grant-Type": "client_credentials",
    "Subscription-Key": "cc665137fcfb4a95a0c2701e58828e7c",
    Scope: "profile",    
}

export const keyCloakHeadersHadoop : AuthHadoop = {
    "Subscription-Key": "2d489b65ea374662b3c6c6929dd62f9a"
}
