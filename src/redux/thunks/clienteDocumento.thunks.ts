import { getClienteDocumento } from "../../api/apmDesaApi";
import { clienteDocumentoActions } from "../slices/clienteDocumento.slice";
import { AppDispatch } from "../store";

export const getClienteDocumentoAction: any = (nroDocumento: any) => async (dispatch: AppDispatch) => {
    dispatch(clienteDocumentoActions.clienteDocumentoRequest());
    return getClienteDocumento(nroDocumento)
    .then((response) => {
        dispatch(clienteDocumentoActions.clienteDocumentoSuccess(response.data))
    }).catch((ex:any) => {
        dispatch(clienteDocumentoActions.clienteDocumentoError(ex))
    })
}