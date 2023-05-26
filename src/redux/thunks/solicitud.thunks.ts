import { getSolicitudCliente } from "../../api/apmDesaApi";
import { solicitudActions } from "../slices/solicitud.slice";
import { AppDispatch } from "../store"

export const getSolicitudClienteAction: any = () => async (dispatch: AppDispatch) => {
    dispatch(solicitudActions.solicitudRequest());
    return getSolicitudCliente()
        .then((response) => {
            dispatch(solicitudActions.solicitudSuccess(response.data))  
        }).catch((ex: any) => {
            dispatch(solicitudActions.solicitudError(ex))  
        })
}