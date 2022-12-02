
import { getClienteDatos } from "../../api/apmDesaApi";
import { clienteDatosActions } from "../slices/clienteDatos.slice";
import { AppDispatch } from "../store";

export const getClienteDatosAction: any = (codigoCliente: string) => async (dispatch: AppDispatch) => {
    dispatch(clienteDatosActions.clienteDatosRequest());
    return getClienteDatos(codigoCliente)
    .then((response) => {
        dispatch(clienteDatosActions.clienteDatosSuccess(response.data))
    }).catch((ex:any) => {
        dispatch(clienteDatosActions.clienteDatosError(ex))
    })
}