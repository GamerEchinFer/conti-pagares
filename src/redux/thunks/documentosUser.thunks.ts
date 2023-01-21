import { getConsultaDocumentosUser } from "../../api/apmDesaApi";
import { documentosUserActions } from "../slices/documentosUser.slice";
import { AppDispatch } from "../store";

export const getDocumentosUserAction: any = (codigoCliente: string) => async (dispatch: AppDispatch) => {
    dispatch(documentosUserActions.documentosUserRequest());
    return getConsultaDocumentosUser(codigoCliente)
    .then((response) => {
        dispatch(documentosUserActions.documentosUserSuccess(response.data))
    }).catch((ex:any) => {
        dispatch(documentosUserActions.documentosUserError(ex))
    })
}