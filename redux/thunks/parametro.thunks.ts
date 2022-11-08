
import { getParametros, getParametrosVisibles } from '../../pages/api/apmDesaApi';
import { parametroActions, ParametrosSelect } from '../slices/parametro.slice';
import { AppDispatch } from "../store";

export const getParametroAction: any = (idProducto: number, idSubproducto: number) => async (dispatch: AppDispatch) => {
    dispatch(parametroActions.parametroRequest());

    try {
        // primero traemos los visibles
        const {data: visibles} = await getParametrosVisibles(idProducto, idSubproducto)
        const parametrosSelect: ParametrosSelect = {};
        // for (var i = 0; i < visibles.length; i++) {
        //     const visible = visibles[i];
        for (const visible of visibles) {
            const response = await getParametros(visible.parametroVisible)
            // parametrosSelect.actividad = response.data;
            // parametrosSelect["actividad"] = response.data;
            parametrosSelect[visible.parametroVisible] = [...response.data];
        }
        /*for (const visible of visibles) {
            // llamando api varias veces de parametros para traer sus datos
            
        }*/

        
        return dispatch(parametroActions.parametroSuccess(parametrosSelect));        
    } catch(ex: any) {
        console.log(ex);
        dispatch(parametroActions.parametroError(ex));
    }

    
}
