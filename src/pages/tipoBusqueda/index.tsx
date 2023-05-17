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
import { useKeycloak } from "@react-keycloak/web";
import { login } from "../../actions/Auth.actions";
import { getUsuarioKeyCloack } from "../../redux/slices/auth/auth.slice";

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
  const router = useRouter();

  const autenticar = () => {
    if (keycloak.authenticated === false && !keycloak?.tokenParsed?.preferred_username) {
      keycloak.login();
    }
  };
  
  useEffect(() => {
    if (initialized) {
      autenticar();
    }
  }, []);
  
  useEffect(() => {
    if (keycloak?.tokenParsed?.preferred_username) {
      login();
      dispatch(getUsuarioKeyCloack(keycloak?.tokenParsed?.preferred_username))
    }
  }, [keycloak?.tokenParsed?.preferred_username]);
  
  console.log(getUsuarioKeyCloack);

  
  useEffect(() => {
      // dispatch(getProductosAction());
      // if (auth) {
        dispatch(busquedaActions.busquedaRequest());
        dispatch(clienteDatosActions.clienteDatosReset());
        dispatch(clienteDocumentoActions.clienteDocumentoReset()); 
      //}      
      /*postAutenticarServicio(keycloakHeaders).then((value) => {    
        debugger;        
        localStorage.setItem("gdi-auth", JSON.stringify(value));      
      }).finally(() => {

      })*/
  }, [auth])

  /*useEffect(() => {
    getTipoBusquedaById(tipoBusquedaSelected).then((response) => {
      setTipoBusqueda(response.data)
    })
  }, [tipoBusquedaSelected]);*/

  const focusUsernameInputField = (input: any )=> {
    if (input) {
      setTimeout(() => {input.focus()}, 100);
    }
  };


  const handleDocument = () => {
    // debugger
    // const axios = require('axios');
    // let data = '<?xml version="1.0" encoding="UTF-8"?><Documentos><usuario>AVI</usuario><path>digitalizacion_documentos\\780304\\2018\\2\\14\\135420\\MANIFESTACION DE BIENES.pdf</path></Documentos>';
    
    // let config = {
    //   method: 'post',
    //   maxBodyLength: Infinity,
    //   url: 'https://srvfuente-evo.bancontinental.com.py:5005/api/nintex/postBajarArchivoPAS',
    //   headers: { 
    //     'Content-Type': 'text/xml'
    //   },
    //   data : data
    // };
    
    // axios.request(config)
    // .then((response: any) => {
    //   console.log(JSON.stringify(response.data));
    //   var xhr = new XMLHttpRequest();
    //   const parser = new DOMParser();
    //   const xml = response.data
    //   const doc = parser.parseFromString(xml, "text/xml");
    //   console.log("first", doc)
    //   const contenido = doc.getElementsByTagName('contenido')[0]
      
    //   if(contenido){
    //     const base64Binary = contenido.getElementsByTagName('base64Binary')[0];
    //     if(base64Binary){ console.log(base64Binary.outerHTML)} else {console.log('error de xml')}
    //   } else { console.log("no existe contenido")}
      
    //   // console.log(doc)
    // })
    // .catch((error: any) => {
    //   console.log(error);
    // });
  }

  return (
    <>
			<Grid container pt={3} style={{ justifyContent: 'center' }}>
				<Box className={styles['box-user']} style={{padding: mediaQueryPadding ? '0px 0px' : '0px'}}>
        <div>
          {/* {JSON.stringify(getProductos())} */}
          <GDITitulosComponent />
          <TBBodyPrincipal />
          {/* <button onClick={handleDocument} color="primary">Extractos</button> */}
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
        {/* <div className="flex flex-row justify-center gap-8 pb-8">
            <NextButtonTB disabled={!clienteDatos || !clienteDatos.codigoCliente} onClick={handleClickNext} />
        </div> */}
        </Box>
      </Grid>
    </>
  )
}

export default TipoBusquedaPage
