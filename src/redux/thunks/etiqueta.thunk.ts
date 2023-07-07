
import { AppDispatch } from "../store";
import { etiquetaVariableActions } from '../slices/etiquetaVariable.slice';
import { EtiquetaVariable } from '../../interfaces/interfaces';
import { postEtiquetaVariable } from "../../api/apmDesaApi";

export const postEtiquetasVariablesAction: any = (body: EtiquetaVariable[]) => async (dispatch: AppDispatch) => {
    dispatch(etiquetaVariableActions.etiquetaVariableRequest());

    try {
        
      const {data, status} = await postEtiquetaVariable(body);

      if (status === 200) {  
        if (data && data.length) {
            dispatch(etiquetaVariableActions.etiquetaVariableSuccess(data))
          }
      }
      return status        
    } catch(ex: any) {
        console.log(ex);
        dispatch(etiquetaVariableActions.etiquetaVariableError(ex));
    }
    
}
