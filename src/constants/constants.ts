import { AutenticarServicioHeader, AuthHadoop } from "../interfaces/interfaces"

export const baseUrl = process.env.NODE_ENV === "development" ? 
    "https://gdi-desa.bancontinental.com.py/" : "https://gdi-desa.bancontinental.com.py/"

export const keycloakHeaders: AutenticarServicioHeader = {
    // APIM DESA
    "Client-Id": "gestion-documental",
    "Client-Secret": "62acef17-4d09-4620-a480-7f8a4b4f7472",
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

