
import { getTipoBusqueda } from "../../api/apmDesaApi";
import { busquedaActions } from "../slices/busqueda.slice";
import { AppDispatch } from "../store";

export const getBusquedaAction: any = () => async (dispatch: AppDispatch) => {
    dispatch(busquedaActions.busquedaRequest());
    return getTipoBusqueda()
    .then((response) => {
        dispatch(busquedaActions.busquedaSuccess(response.data))
    }).catch((ex:any) => {
        dispatch(busquedaActions.busquedaError(ex))
    })
}