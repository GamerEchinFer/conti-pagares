import { getConsultaDocumentosUser } from "../../api/apmDesaApi";
import { documentUserMapper } from "../../helpers/documentUserMapper";
import { documentosUserActions } from "../slices/documentosUser.slice";
import { AppDispatch } from "../store";

export const getDocumentosUserAction: any = (codigoCliente: string, idGrupo: number) => async (dispatch: AppDispatch) => {
    dispatch(documentosUserActions.documentosUserRequest());
    return getConsultaDocumentosUser(codigoCliente)
    .then((response) => {

        const {data} = response
        const dataMapped = documentUserMapper(data, idGrupo) 

        dispatch(documentosUserActions.documentosUserSuccess({items: data, itemsMapped: dataMapped}))
    }).catch((ex:any) => {
        dispatch(documentosUserActions.documentosUserError(ex))
    })
}