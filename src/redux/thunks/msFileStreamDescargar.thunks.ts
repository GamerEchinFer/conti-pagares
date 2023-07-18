import { AppDispatch } from '../store';
import { msFileStreamDescargarActions } from '../slices/msFileStreamDescargar.slice';
import { getDescargarMsFileStream } from '../../api/apmDesaApi';

export const getMsFileStreamAction: any = (path: string) =>  async (dispatch: AppDispatch) => {
    dispatch(msFileStreamDescargarActions.msFileStreamDescargarRequest());
    return getDescargarMsFileStream(path)
    .then((response) => {
        dispatch(msFileStreamDescargarActions.msFileStreamDescargarSuccess(response.data))        
    }).catch((ex:any) => {
        dispatch(msFileStreamDescargarActions.msFileStreamDescargarError(ex));
    })
} 