
import { AppDispatch } from "../store";
import { GuardarDocumento } from "../../interfaces/interfaces";
import { guardarDocumentoActions } from "../slices/guardarDocumento.slice";
import { postGuardarDocumento } from "../../api/apmDesaApi";

export const postGuardarDocumentoAction: any = (body: GuardarDocumento) => async (dispatch: AppDispatch) => {
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
