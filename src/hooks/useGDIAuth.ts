import { useEffect } from "react";
import { postAutenticarServicio } from "../api/keycloakApi";
import { keycloakHeaders } from "../constants/constants";
import { AuthenticationResponse } from "../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { authGDIActions } from "../redux/slices/auth/auth-gdi.slice";

const expires_in = 250;
export const STORAGE_GDI_AUTH = "gdi-auth";

export const useGDIAuth = () => {

  const dispatch = useDispatch();

  // const [auth, setAuth] = useLocalStorageState<AuthenticationResponse | undefined>(STORAGE_GDI_AUTH, {defaultValue: undefined})  
  
  const requestAuth = () => {
    dispatch(authGDIActions.requestAuth());
  }
  const setAuth = (value: AuthenticationResponse | undefined) => {
    dispatch(authGDIActions.setAuth(value));
  }

  useEffect(() => {

    requestAuth();
    setAuth(undefined);        

    postAutenticarServicio(keycloakHeaders).then((value) => {                                  
      setAuth(value);          
    });

    const interval = setInterval(() => {       
      postAutenticarServicio(keycloakHeaders).then((value) => {  
        const miliseconds = new Date().getTime();
          setAuth(value);                           
      })          
    }, 1000 * expires_in);    
    
    
    return () => {
      clearInterval(interval);
    }

  }, [])
    
}
