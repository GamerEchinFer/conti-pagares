
import { getCertificacionEstados } from "../../api/apmDesaApi";
import { certificacionEstadosActions } from "../slices/certificacionEstados.slice";
import { AppDispatch } from "../store";

export const getCertificacionEstadosAction: any = () => async (dispatch: AppDispatch) => {
    dispatch(certificacionEstadosActions.certificacionEstadosRequest());
    return getCertificacionEstados()
    .then((response) => {
        dispatch(certificacionEstadosActions.certificacionEstadosSuccess(response.data))
    }).catch((ex:any) => {
        dispatch(certificacionEstadosActions.certificacionEstadosError(ex))
    })
}