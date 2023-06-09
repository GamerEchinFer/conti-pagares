import ModalParaEntity from "../../../models/entities/ModalPara.Entity";
import dataErrorResponse from "../../../models/responses/DataError.response";

interface UiStateModel {
    msgError:                                   string | null,
    dataError:                                  dataErrorResponse |  null, 
    loadingToken:                               boolean;
    loadingPermisos:                            boolean;
    loadingAgente:                              boolean;
    loadingIpGeolocation:                       boolean,
    modalPara:                                  ModalParaEntity | null,
}

export default UiStateModel;
