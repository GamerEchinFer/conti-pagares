
import { getProductos } from "../../api/apmDesaApi";
import { productoActions } from "../slices/producto.slice";
import { AppDispatch } from "../store";

export const getProductosAction: any = () => async (dispatch: AppDispatch) => {
    dispatch(productoActions.productoRequest());
    return getProductos()
    .then((response) => {
        dispatch(productoActions.productoSuccess(response.data))
    }).catch((ex:any) => {
        dispatch(productoActions.productoError(ex))
    })
}