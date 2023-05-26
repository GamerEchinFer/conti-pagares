import { getParametros, getParametrosVisibles } from '../../api/apmDesaApi';
import { parametroActions, ParametrosSelect } from '../slices/parametro.slice';
import { AppDispatch } from "../store";

export const getParametroAction: any = (idProducto: number, idSubproducto: number) => async (dispatch: AppDispatch) => {
    dispatch(parametroActions.parametroRequest());

    try {
        const {data: visibles} = await getParametrosVisibles(idProducto, idSubproducto)
        const parametrosSelect: ParametrosSelect = {};
        for (const visible of visibles) {
            const response = await getParametros(visible.parametroVisible)
            parametrosSelect[visible.parametroVisible] = [...response.data];
        }
        
        return dispatch(parametroActions.parametroSuccess(parametrosSelect));        
    } catch(ex: any) {
        console.log(ex);
        dispatch(parametroActions.parametroError(ex));
    }

    
}
