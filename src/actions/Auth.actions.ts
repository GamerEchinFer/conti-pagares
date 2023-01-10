import { Geolocalizacion } from "../api/ApiAuth";
import { showLoadingIpGeolocation } from "../redux/slices/ui/ui.slice";
import { AppDispatch } from "../redux/store";
import {getIpGeolocation as getIpGeolocationReducer} from "../redux/slices/auth/auth.slice";
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