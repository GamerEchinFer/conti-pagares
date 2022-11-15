
import { getSubProductos } from "../../api/apmDesaApi";
import { subProductoActions } from "../slices/subProducto.slice";
import { AppDispatch } from "../store";

export const getSubProductosAction: any = (idProducto: number) => async (dispatch: AppDispatch) => {
    dispatch(subProductoActions.subProductoRequest());
    return getSubProductos(idProducto)
    .then((response) => {
        dispatch(subProductoActions.subProductoSuccess(response.data))        
    }).catch((ex:any) => {
        dispatch(subProductoActions.subProductoError(ex))
    })
}                                                                      