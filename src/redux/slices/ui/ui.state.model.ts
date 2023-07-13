import ModalParaEntity from "../../../models/entities/ModalPara.Entity";
import { dataErrorResponse } from "../../../models/responses";

interface UiStateModel {
    msgError:                                   string | null,
    dataError:                                  dataErrorResponse |  null, 
    loadingToken:                               boolean;
    loadingAgente:                              boolean;
    loadingPermisos:                            boolean;
    modalPara:                                  ModalParaEntity | null,
    loadingIpGeolocation:                       boolean,
    loadingCodigoCliente:                       boolean,
    loadingDatosBasicos:                        boolean;
}

export default UiStateModel;