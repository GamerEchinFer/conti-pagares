import { apiDataClient } from "../lib/apiClient";

const getClientDataByDocumentNumber = (docNumber: string) => {
    return apiDataClient.get<ClientData>(`/clientes/datos?NumeroDocumento=${docNumber}`, { method: "GET" });
}
const getClientDataByClientCode = (clientCode: string) => { 
    return apiDataClient.get<ClientData>(`/clientes/${clientCode}`, { method: "GET" });
}

const getCrcClientDataByDocumentNumber = (docNumber: string) => {
    return apiDataClient.get<ClientData>(`/clientes/datos?NumeroDocumento=${docNumber}`, { method: "GET" });
}

const getTokenApiDataClient = () => {
    return apiDataClient.get<string>("/authenticacion", { method: "GET" });
}

// https://apibanking-desa.bancontinental.com.py/v1/api/clientes/datos?NumeroDocumento=765154

// https://apibanking-desa.bancontinental.com.py/v1/api/clientes/505105


export const clientsServices = {
    getClientDataByDocumentNumber,
    getClientDataByClientCode,
    getCrcClientDataByDocumentNumber,
}