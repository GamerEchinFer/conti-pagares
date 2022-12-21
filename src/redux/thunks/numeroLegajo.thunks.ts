
import { getNumeroLegajo } from "../../api/apmDesaApi";
import { numeroLegajoActions } from "../slices/numeroLegajo.slice";
import { AppDispatch } from "../store";

export const getNumeroLegajoAction: any = (nextSequence: number) => async (dispatch: AppDispatch) => {
    dispatch(numeroLegajoActions.numeroLegajoRequest());
    return getNumeroLegajo(nextSequence)
    .then((response) => {
        dispatch(numeroLegajoActions.numeroLegajoSuccess(response.data))
    }).catch((ex:any) => {
        dispatch(numeroLegajoActions.numeroLegajoError(ex))
    })
}