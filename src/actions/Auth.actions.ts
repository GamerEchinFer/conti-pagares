import { Geolocalizacion } from "../api/ApiAuth";
import { showLoadingIpGeolocation, showLoadingToken } from "../redux/slices/ui/ui.slice";
import { AppDispatch } from "../redux/store";
import { login as loginReducer, getIpGeolocation as getIpGeolocationReducer} from "../redux/slices/auth/auth.slice";
import LoginResponse from "../models/responses/Login.response";
import { apiTokenInterna } from "../api-interna/Auth";

export const login = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(showLoadingToken(true));
        const loginResp = await apiTokenInterna() as LoginResponse;
        if (loginResp && loginResp !== null) {
            dispatch(showLoadingToken(false));
            dispatch(loginReducer(loginResp as string));
            // console.log(loginReducer);
        } else {
            dispatch(loginReducer(null));
        }
        dispatch(showLoadingToken(false));
    }
};

export const getIpGeolocation = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(showLoadingIpGeolocation(true));
        const geolocation = await Geolocalizacion();
        if (geolocation !== null) {
            dispatch(getIpGeolocationReducer(geolocation.data));
        }
        dispatch(showLoadingIpGeolocation(false));
    }
};