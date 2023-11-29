import dayjs from "dayjs";
import { ID_SUB_PRODUCTO_PROMISSORY_NOTES, ID_TIPO_DOCUMENTO_PROMISSORY_NOTES } from "../constants/promissoryNotes/accusationConfig";
import { getDateRequestFormated } from "../helpers/commons";
import { DateRangeRequestValue } from "../interfaces/_common";
import { apiDigital, apiDigitalArchivos, apiPromissoryNotes } from "../lib/apiClient"
import { PromissoryNotesConsult, PromissoryNotesDownloadFile, PromissoryNotesFolderDocument } from "../models/responses/promissoryNotes";

const getConsult = (operation: string, client: string, fee: string, { from, to }: DateRangeRequestValue) => {
    const fromFormated = getDateRequestFormated(from);
    const toFormated = getDateRequestFormated(to);
    const params = new URLSearchParams();
    params.append('FechaDesde', fromFormated ?? "");
    params.append('FechaHasta', toFormated ?? "");
    params.append('cuota', fee);
    const queryString = params.toString();

    return apiPromissoryNotes.get<PromissoryNotesConsult[]>(`/custodia-documentos/pagares/operacion/${operation}/cliente/${client}?${queryString}`);
}

const getFolderDocuments = async (clientCode: string, { from, to }: DateRangeRequestValue) => {
    const resp = await apiDigital.get<PromissoryNotesFolderDocument[]>(`/clientes/${clientCode}/documentos/check-list?codigoSubproducto=${ID_SUB_PRODUCTO_PROMISSORY_NOTES}`)

    if (resp.data.length === 0) return resp;
    const data = resp.data;

    const filteredData = data.filter((item) => {
        const date = dayjs(item.fechaDocumento, "YYYY-MM-DDTHH:mm:ss");
        const dateCondition = date >= from && date <= to;
        const productCondition = item.idSubproducto === ID_SUB_PRODUCTO_PROMISSORY_NOTES;
        const documentTypeCondition = item.idTipodocumento === ID_TIPO_DOCUMENTO_PROMISSORY_NOTES;

        return dateCondition && productCondition && documentTypeCondition;
    });
    resp.data = filteredData;

    return resp;
}

const downloadFile = (path: string, token?: string) => {
    return apiDigitalArchivos.get<PromissoryNotesDownloadFile>(
        "download",
        { params: { path }, headers: { Authorization: `Bearer ${token}` } }
    );
}


export const promissoryNotesServices = {
    getConsult,
    getFolderDocuments,
    downloadFile
}