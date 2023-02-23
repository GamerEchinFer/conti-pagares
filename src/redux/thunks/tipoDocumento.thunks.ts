import { getTipoDocumento } from "../../api/apmDesaApi";
import { tipoDocumentoActions } from "../slices/tipoDocumento.slice";
import { AppDispatch } from "../store";

export const getTipoDocumentoAction: any = () => async (dispatch: AppDispatch) => {
    dispatch(tipoDocumentoActions.tipoDocumentoRequest());
    return getTipoDocumento()
    .then((response) => {
        dispatch(tipoDocumentoActions.tipoDocumentoSuccess(response.data))
    }).catch((ex:any) => {
        dispatch(tipoDocumentoActions.tipoDocumentoError(ex));
    })
}