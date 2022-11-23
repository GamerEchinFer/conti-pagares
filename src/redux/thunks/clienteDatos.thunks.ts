
import { getClienteDatos } from "../../api/apmDesaApi";
import { clienteDatosActions } from "../slices/clienteDatos.slice";
import { AppDispatch } from "../store";

export const getClienteDatosAction: any = () => async (dispatch: AppDispatch) => {
    dispatch(clienteDatosActions.clienteDatosRequest());
    return getClienteDatos()
    .then((response) => {
        dispatch(clienteDatosActions.clienteDatosSuccess(response.data))
    }).catch((ex:any) => {
        dispatch(clienteDatosActions.clienteDatosError(ex))
    })
}