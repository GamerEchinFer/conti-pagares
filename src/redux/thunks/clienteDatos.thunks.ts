
import { getClienteDatos, getClienteDocumento } from "../../api/apmDesaApi";
import { clienteDatosActions } from "../slices/clienteDatos.slice";
import { AppDispatch } from "../store";

export const getClienteDatosAction: any = (codigoCliente: string, filtro: "codigo" | "documento") => async (dispatch: AppDispatch) => {
    dispatch(clienteDatosActions.clienteDatosRequest());

    switch(filtro) {
        case "codigo": 
            return getClienteDatos(codigoCliente) 
            .then((response) => {
                dispatch(clienteDatosActions.clienteDatosSuccess(response.data))
            }).catch((ex:any) => {
                dispatch(clienteDatosActions.clienteDatosError(ex))
            })

        case "documento":
            return getClienteDocumento(codigoCliente)
            .then((response) => {
                dispatch(clienteDatosActions.clienteDatosSuccess(response.data))
            }).catch((ex:any) => {
                dispatch(clienteDatosActions.clienteDatosError(ex))
            })
    }
    
    
}