import { getConsultaDocumentosUserFiltro } from "../../api/apmDesaApi";
import { documentosUserFiltroActions } from "../slices/documentosUserFiltro";
import { AppDispatch } from "../store";

export const getDocumentosUserFiltroAction: any = (codigoCliente: string) => async (dispatch: AppDispatch) => {
    dispatch(documentosUserFiltroActions.documentosUserFiltroRequest());
    return getConsultaDocumentosUserFiltro(codigoCliente)
    .then((response) => {
        dispatch(documentosUserFiltroActions.documentosUserFiltroSuccess(response.data))
    }).catch((ex:any) => {
        dispatch(documentosUserFiltroActions.documentosUserFiltroError(ex))
    })
}