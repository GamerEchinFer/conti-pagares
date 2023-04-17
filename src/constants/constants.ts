import { AutenticarServicioHeader, AuthHadoop, AuthHadoopGDI } from "../interfaces/interfaces"

export const baseUrl = process.env.NODE_ENV === "development" ? 
    "https://gdi-desa.bancontinental.com.py/" : "https://gdi-desa.bancontinental.com.py/"

export const keycloakHeaders: AutenticarServicioHeader = {
    // APIM DESA
    "Client-Id": "gestion-documental",
    "Client-Secret": "ac08759b-f2ef-4f41-9b93-3526f980dc0e",
    "Grant-Type": "client_credentials",
    "Subscription-Key": "cc665137fcfb4a95a0c2701e58828e7c",
    Scope: "profile"
    
    // APIM QA
    // "Client-Id": "gestion-documental",
    // "Client-Secret": "c2173556-7eeb-42b7-9150-50c90520a7f6",
    // "Grant-Type": "client_credentials",
    // "Subscription-Key": "578a3e189d3a4da791ad1aa2a00bae3c",
    // Scope: "profile",    
}

export const keyCloakHeadersHadoop : AuthHadoop = {
    "Subscription-Key": "2d489b65ea374662b3c6c6929dd62f9a"
}

export const keyCloakHeadersHadoopGDI : AuthHadoopGDI = {
    "Subscription-Key": "cc665137fcfb4a95a0c2701e58828e7c"
}
