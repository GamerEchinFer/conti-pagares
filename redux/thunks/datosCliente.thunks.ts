import { getDatosCliente } from "../../pages/api/gdiApi";
import { datosClienteActions } from "../slices/datosCliente.slice";
import { AppDispatch } from "../store"

export const getDatosClienteAction: any = () => async (dispatch: AppDispatch) => {
    dispatch(datosClienteActions.datosClienteRequest());
    return getDatosCliente()
        .then((response) => {
            dispatch(datosClienteActions.datosClienteSuccess(response.data))  
        }).catch((ex: any) => {
            dispatch(datosClienteActions.datosClienteError(ex))  
        })
}