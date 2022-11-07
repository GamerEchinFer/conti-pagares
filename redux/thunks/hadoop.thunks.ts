import { AppDispatch } from '../store';
import { hadoopDirectoActions } from '../slices/hadoop.slice';
import { HadoopDirecto } from '../../interfaces/interfaces';
import { postAlzarHadoopDirecto } from '../../api/apmDesaApi';


export const postAlzarHadoopDirectoAction: any = (body: HadoopDirecto,path_images: string, overwrite: boolean, chunk_size: number) => async (dispatch: AppDispatch) => {
    dispatch(hadoopDirectoActions.hadoopDirectoRequest());
    try {
        const data = await postAlzarHadoopDirecto(body, path_images, overwrite, chunk_size);

        if (data && data) {
            dispatch(hadoopDirectoActions.hadoopDirectoSuccess(data));
        }
    } catch (ex: any) {
        console.log(ex);
        dispatch(hadoopDirectoActions.hadoopDirectoError(ex));
    }
    }