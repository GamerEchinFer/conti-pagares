import { postSubirMsFileStream } from '../../api/apmDesaApi';
import { msFileStreamActions } from '../slices/msFileStream.slice';
import { AppDispatch } from '../store';

export const postSubirMsFileStreamAction: any = (body: FormData) => async (dispatch: AppDispatch) => {
    dispatch(msFileStreamActions.msFileStreamRequest());
    try {
        const data = await postSubirMsFileStream(body);

        if (data && data) {
            dispatch(msFileStreamActions.msFileStreamSuccess(data));
        }
    } catch (ex: any) {
        console.log(ex);
        dispatch(msFileStreamActions.msFileStreamError(ex));
    }
}