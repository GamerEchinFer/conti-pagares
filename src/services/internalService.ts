import { DateRangeRequestValue } from "../interfaces/_common";
import { internalApi } from "../lib/apiClient";
import { PromissoryNotesFolderDocument } from "../models/responses/promissoryNotes";
import { getDateRequestFormated } from "../helpers/commons";
import { ClientData, CrcClientData } from "../models/responses/Clients";

const getClientData = async (clientCode?: string, documentNumber?: string) => {
    const params = new URLSearchParams();
    params.append("clientCode", clientCode ?? "");
    params.append("documentNumber", documentNumber ?? "");
    const quertString = params.toString();
    return internalApi.get<ClientData>(`data/getClient?${quertString}`);
};

const getFolderDocuments = async (clientCode: string, { from, to }: DateRangeRequestValue) => {
    const fromFormated = getDateRequestFormated(from);
    const toFormated = getDateRequestFormated(to);
    const params = new URLSearchParams();
    params.append("clientCode", clientCode ?? "");
    params.append("fromDate", fromFormated ?? "");
    params.append("toDate", toFormated ?? "");
    const quertString = params.toString();
    return internalApi.get<PromissoryNotesFolderDocument[]>(`/data/getFolderDocuments?${quertString}`)
}

const downloadFolderDocument = async (path: string) => {
    const params = new URLSearchParams();
    params.append("path", path ?? "");
    const quertString = params.toString();
    return internalApi.get<string>(`/file/downloadFolderDocument?${quertString}`)
}


const getCrcClientDataByDocumentNumber = (docNumber: string) => {
    return internalApi.get<CrcClientData>(`/datos/getCrcClient?documentNumber=${docNumber}`, { method: "GET" });
}

export const internalServices = {
    getClientData,
    getFolderDocuments,
    downloadFolderDocument,
    getCrcClientDataByDocumentNumber,
};
