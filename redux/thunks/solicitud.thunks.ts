import { getAllSolicitudCliente } from "../../pages/api/gdiApi";
import { solicitudActions } from "../slices/solicitud.slice";
import { AppDispatch } from "../store"

export const getAllSolicitudClienteAction: any = () => async (dispatch: AppDispatch) => {
    dispatch(solicitudActions.solicitudRequest());
    return getAllSolicitudCliente()
        .then((response) => {
            dispatch(solicitudActions.solicitudSuccess(response.data))  
        }).catch((ex: any) => {
            dispatch(solicitudActions.solicitudError(ex))  
        })
}