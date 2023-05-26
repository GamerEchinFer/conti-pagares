
import { getTipoDocumentoHistorico } from "../../api/apmDesaApi";
import { tipoDocumentoHistoricoActions } from "../slices/documentoHistorico.slice";
import { AppDispatch } from "../store";

export const getTipoDocumentoHistoricoAction: any = ( codigoCliente: string, codigoTipoDocumento: number) => async (dispatch: AppDispatch) => {
    dispatch(tipoDocumentoHistoricoActions.tipoDocumentoHistoricoRequest());
    return getTipoDocumentoHistorico(codigoCliente, codigoTipoDocumento)
    .then((response) => {
        dispatch(tipoDocumentoHistoricoActions.tipoDocumentoHistoricoSuccess(response.data))        
    }).catch((ex:any) => {
        dispatch(tipoDocumentoHistoricoActions.tipoDocumentoHistoricoError(ex))
    })
}                                                                      