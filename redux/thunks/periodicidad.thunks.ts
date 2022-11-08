import { getPeriodicidad } from "../../pages/api/gdiApi";
import { periodicidadActions } from "../slices/periodicidad.slice";
import { AppDispatch } from "../store";

export const getPeriodicidadAction: any = (idTipoDocumento: number) => async (dispatch: AppDispatch) => {
    dispatch(periodicidadActions.periodicidadRequest());
    return getPeriodicidad(idTipoDocumento)
    .then((response) => {
        dispatch(periodicidadActions.periodicidadSuccess(response.data))
    }).catch((ex:any) => {
        dispatch(periodicidadActions.periodicidadError(ex))
    })
}