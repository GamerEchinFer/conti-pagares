
import { getParametrosVisibles } from "../../pages/api/apmDesaApi";
import { parametroVisibleActions } from "../slices/parametroVisible.slice";
import { AppDispatch } from "../store";

export const getParametroVisibleAction: any = (idProducto: number, idSubProducto : number) => async (dispatch: AppDispatch) => {
    dispatch(parametroVisibleActions.parametroVisibleRequest());
    return getParametrosVisibles(idProducto, idSubProducto)
    .then((response) => {
        dispatch(parametroVisibleActions.parametroVisibleSuccess(response.data))
    }).catch((ex:any) => {
        dispatch(parametroVisibleActions.parametroVisibleError(ex))
    })
}
