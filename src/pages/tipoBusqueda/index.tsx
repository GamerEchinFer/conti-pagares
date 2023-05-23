import { Box, Grid, TextField, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { theme } from "../../../theme/Theme";
import SearchbarButton from "../../components/Buttons/SearchbarButton";
import DatosPersonales from '../../components/DatosPersonales/DatosPersonales';
import RadioButtonOption from "../../components/RadioButtonOption";
import TBBodyPrincipal from "../../components/TipoBusqueda/TBBodyPrincipal";
import GDITitulosComponent from "../../components/TituloySubtitulo/GDITitulosComponent";
import LoadingIcon from "../../components/shared/LoadingIcon";
import { TipoBusqueda } from '../../interfaces/interfaces';
import { busquedaActions } from "../../redux/slices/busqueda.slice";
import { clienteDatosActions } from '../../redux/slices/clienteDatos.slice';
import { clienteDocumentoActions } from "../../redux/slices/clienteDocumento.slice";
import { RootState } from "../../redux/store";
import { getClienteDatosAction } from '../../redux/thunks/clienteDatos.thunks';
import styles from './TipoBusqueda.module.css';
import { useGDIAuth } from "../../hooks/useGDIAuth";
import { v4 as uuidv4 } from 'uuid';
import { useKeycloak } from '@react-keycloak/web';
import { reset as resetUi } from '../../redux/slices/ui/ui.slice';
import { getUsuarioKeyCloack, reset as resetAuth } from '../../redux/slices/auth/auth.slice';
import { login } from "../../actions/Auth.actions";

const filtros = ["codigo", "documento"]

const TipoBusquedaPage = () => {
  
  const dispatch = useDispatch();
  
  const [tipoBusqueda, setTipoBusqueda] = useState<TipoBusqueda | null>();
  const [tipoBusquedaSelected, setTipoBusquedaSelected] = useState(1);
  const [codigoCliente, setCodigoCliente] = useState("");
  const [clienteDocumento, setClienteDocumento] = useState("");
  const [nextPage, setNextPage] = useState();
  const mediaQueryPadding = useMediaQuery(theme.breakpoints.down(705));
  const auth = useSelector((state: RootState) => state.authGDI.gdiAuth);
  const clienteDatos = useSelector((state: RootState) => state.clienteDatos.items);
  const loading = useSelector((state: RootState) => state.clienteDatos.loading);
  const { keycloak, initialized } = useKeycloak();
	const { idDispositivo } = useSelector((state:RootState)=>state.auth);
	const { access_token, permisosUsuario } = useSelector((state:RootState)=>state.auth)

  
  useEffect(() => {
    dispatch(busquedaActions.busquedaRequest());
    dispatch(clienteDatosActions.clienteDatosReset());
    dispatch(clienteDocumentoActions.clienteDocumentoReset());
}, [auth])

const limpiarDatos = () => {
  dispatch(resetAuth());
  dispatch(resetUi());
}

const autenticar = () => {
  if(keycloak.authenticated === false && !keycloak?.tokenParsed?.preferred_username){
    keycloak.login()
  }
}

useEffect(() => {
  limpiarDatos();
  if (initialized) {
    autenticar()
  }
}, [])

useEffect(() => {
  if (keycloak?.tokenParsed?.preferred_username){
    login()
    dispatch(getUsuarioKeyCloack(keycloak?.tokenParsed?.preferred_username))
  }
}, [keycloak?.tokenParsed?.preferred_username])

useEffect(() => {
  if (access_token && keycloak?.tokenParsed?.preferred_username){
    console.log("procedimientos ejecutandose")
  }
}, [access_token])

  const focusUsernameInputField = (input: any )=> {
    if (input) {
      setTimeout(() => {input.focus()}, 100);
    }
  };

  return (
    <>
			<Grid container pt={3} style={{ justifyContent: 'center' }}>
				<Box className={styles['box-user']} style={{padding: mediaQueryPadding ? '0px 0px' : '0px'}}>
        <div>
          {/* {JSON.stringify(getProductos())} */}
          <GDITitulosComponent />
          <TBBodyPrincipal />
          <div>
            <div>
              <RadioButtonOption
                tipoBusquedaSelected={tipoBusquedaSelected} 
                setTipoBusquedaSelected={setTipoBusquedaSelected} 
                />
              <div className="flex flex-row items-center">
                <div className="labelRadio flex flex-col pl-28">
                  {/* {tipoBusqueda?.nameTipoBusqueda ?? ""} */}
                </div>
                <div className="flex flex-col items-start  gap-7 w-1/8 pt-2">
                  <TextField
                    size="small" 
                    id="outlined-basic"
                    autoFocus={true}
                    ref={focusUsernameInputField}              
                    value={codigoCliente ?? clienteDocumento}
                    onChange={(e) => {
                      setCodigoCliente(e.target.value); 
                      setClienteDocumento(e.target.value);
                    }}
                    onKeyPress={(event) => {
                      if (event.key === 'Enter') {
                        dispatch(getClienteDatosAction(codigoCliente, filtros[tipoBusquedaSelected - 1]))
                      }
                    }}
                    // value={tipoBusquedaSelected} 
                    // label={tipoBusqueda?.nameTipoBusqueda ?? ""}
                    variant="outlined"
                    sx={{
                      '& label': { paddingLeft: (theme) => theme.spacing(2) },
                      '& input': { paddingLeft: (theme) => theme.spacing(1.5), },
                      '& fieldset': {
                        // paddingLeft: (theme) => theme.spacing(2.5),
                        borderRadius: '5px',
                      },
                      minWidth: 300
                    }}
                      
                  />
                </div>
                <div className="flex flex-col pl-28 pt-1">
                  <SearchbarButton 
                    active={codigoCliente.length > 0} 
                    onClick={() => 
                      dispatch(getClienteDatosAction(codigoCliente, filtros[tipoBusquedaSelected - 1]))}  
                      />
                    {/* ? <SearchbarButton active={clienteDocumento.length > 0} onClick={() => 
                      dispatch(getClienteDocumentoAction(clienteDocumento))}  /> : null} */}
                 </div>
              </div>
                {
                loading
                ? (
                  <div className="flex justify-center pt-10 pb-10 w-200">
                    <LoadingIcon />
                  </div>
                  )
                  : null
                }
            </div>
          </div>
          <DatosPersonales />
          
          </div>
        </Box>
      </Grid>
    </>
  )
}

export default TipoBusquedaPage
