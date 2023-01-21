
import { postAlzarArchivo, postCreateTokenInterno, postDescargarArchivo } from "../../api/apmDesaApi";
import { AlzarArchivoRequest, DescargarArchivo } from '../../interfaces/interfaces';
import { extractosActions } from '../slices/extractos.slice';
import { AppDispatch } from "../store";

const credentials = {
    usuario: "IFC16btVoIxxeAJ36GTzkTMamWPDjbVa7cfXwCimPDXm6xQ2Xf0Jc455j4ofhlMs",
    password: "WN3W5UlCOhPV2Eh3gTjifA=="
}

export const postAlzarArchivoAction: any = (body: AlzarArchivoRequest) => async (dispatch: AppDispatch) => {
    dispatch(extractosActions.alzarArchivoRequest());

    try {
        const {token} = await postCreateTokenInterno(credentials)
        const data = await postAlzarArchivo(body, token);
        
        if (data) {          
            dispatch(extractosActions.alzarArchivoSuccess);
        }

    } catch(ex: any) {
        console.log(ex);
        dispatch(extractosActions.alzarArchivoError(ex));
    }

    
}

export const postDescargarArchivoAction: any = (body: DescargarArchivo) => async (dispatch: AppDispatch) => {
    dispatch(extractosActions.descargarArchivoRequest());

    try {
        const {token} = await postCreateTokenInterno(credentials)
        const data = await postDescargarArchivo(body, token);
        
        if (data) {          
          dispatch(extractosActions.descargarArchivoSuccess(data));
        }

    } catch(ex: any) {
        console.log(ex);
        dispatch(extractosActions.descargarArchivoError(ex));
    }
}