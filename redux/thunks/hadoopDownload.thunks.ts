import { getDescargarHadoopDirecto } from "../../api/apmDesaApi";
import { AppDispatch } from '../store';
import { hadoopDownloadActions } from '../slices/hadoopDownload.slice';

export const getDownloadAction: any = (downloadpath: string) =>  async (dispatch: AppDispatch) => {
    dispatch(hadoopDownloadActions.hadoopDownloadRequest());
    return getDescargarHadoopDirecto(downloadpath)
    .then((response) => {
        dispatch(hadoopDownloadActions.hadoopDownloadSuccess(response.data))        
    }).catch((ex:any) => {
        dispatch(hadoopDownloadActions.hadoopDownloadError(ex));
    })
} 