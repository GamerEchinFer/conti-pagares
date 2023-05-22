import dataErrorResponse from "../../../models/responses/DataError.response";

interface UiStateModel {
    msgError:                                   string | null,
    dataError:                                  dataErrorResponse |  null, 
    loadingToken:                               boolean;
    loadingPermisos:                            boolean;
    loadingIpGeolocation:                       boolean,
}

export default UiStateModel;
