import { AutenticarServicioHeader, AuthHadoop, AuthHadoopGDI } from "../interfaces/interfaces"

export const baseUrl = process.env.NODE_ENV === "development" ? 
    "https://gdi-desa.bancontinental.com.py/" : "https://gdi-desa.bancontinental.com.py/"

export const keycloakHeaders: AutenticarServicioHeader = {
    // APIM DESA
    // "Client-Id": "gestion-documental",
    // "Client-Secret": "f6aad64c-f5b7-4f1d-b4a5-99c6e14d094e",
    // "Grant-Type": "client_credentials",
    // "Subscription-Key": "cc665137fcfb4a95a0c2701e58828e7c",
    // Scope: "profile"
    
    // APIM QA
    "Client-Id": process.env.NEXT_PUBLIC_CLIENTE_ID as string,
    "Client-Secret": process.env.NEXT_PUBLIC_CLIENT_SECRET as string,
    "Grant-Type": process.env.NEXT_PUBLIC_GRANT_TYPE as string,
    "Subscription-Key": process.env.NEXT_PUBLIC_SUSCRIPTION_KEY as string,
    Scope: "profile", 
}

export const keyCloakHeadersHadoop : AuthHadoop = {
    "Subscription-Key": "2d489b65ea374662b3c6c6929dd62f9a"
}

export const keyCloakHeadersHadoopGDI : AuthHadoopGDI = {
    "Subscription-Key": "cc665137fcfb4a95a0c2701e58828e7c"
}
