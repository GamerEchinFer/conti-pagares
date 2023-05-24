import { AutenticarServicioHeader, AuthHadoop, AuthHadoopGDI } from "../interfaces/interfaces"

export const baseUrl = process.env.NODE_ENV === "development" ? 
    "https://gdi-qa.bancontinental.com.py/" : "https://gdi-qa.bancontinental.com.py/"

export const keycloakHeaders: AutenticarServicioHeader = {
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
