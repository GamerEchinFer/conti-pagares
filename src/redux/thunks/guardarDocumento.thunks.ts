
import { AppDispatch } from "../store";
import { guardarDocumentoActions } from "../slices/guardarDocumento.slice";
import { postGuardarDocumento } from "../../api/apmDesaApi";
import { GuardarDocumentoRequest } from '../../interfaces/interfaces';

export const postGuardarDocumentoAction: any = (body: GuardarDocumentoRequest) => async (dispatch: AppDispatch) => {
    dispatch(guardarDocumentoActions.guardarDocumentoRequest());

    try {
        
      const data = await postGuardarDocumento(body);

        if (data && data.idDocumentos) {
          dispatch(guardarDocumentoActions.guardarDocumentoSuccess(data))
        }

    } catch(ex: any) {
        console.log(ex);
        dispatch(guardarDocumentoActions.guardarDocumentoError(ex));
    }

    
}
