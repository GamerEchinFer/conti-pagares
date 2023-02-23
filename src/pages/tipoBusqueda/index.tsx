import { Box, Grid, TextField, useMediaQuery } from "@mui/material"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getTipoBusquedaById } from "../../api/gdiApi";
import SearchbarButton from "../../components/Buttons/SearchbarButton";
import RadioButtonOption from "../../components/RadioButtonOption";
import TBBodyPrincipal from "../../components/TipoBusqueda/TBBodyPrincipal";
import GDITitulosComponent from "../../components/TituloySubtitulo/GDITitulosComponent";
import { TipoBusqueda } from '../../interfaces/interfaces';
import styles from './TipoBusqueda.module.css';
import { theme } from "../../../theme/Theme";
import { useDispatch, useSelector } from 'react-redux';
import { clienteDatosActions } from '../../redux/slices/clienteDatos.slice';
import { getClienteDatosAction } from '../../redux/thunks/clienteDatos.thunks';
import { useMount } from 'ahooks';
import { postAutenticarServicio } from "../../api/keycloakApi";
import { keycloakHeaders } from "../../constants/constants";
import { clienteDocumentoActions } from "../../redux/slices/clienteDocumento.slice";
import { RootState } from "../../redux/store";
import LoadingIcon from "../../components/shared/LoadingIcon";
import DatosPersonales from '../../components/DatosPersonales/DatosPersonales';
import { getProductosAction } from "../../redux/thunks/producto.thunks";
import { busquedaActions } from "../../redux/slices/busqueda.slice";

const filtros = ["codigo", "documento"]

const TipoBusquedaPage = () => {

  const dispatch = useDispatch()

  const [tipoBusqueda, setTipoBusqueda] = useState<TipoBusqueda | null>();
  const [tipoBusquedaSelected, setTipoBusquedaSelected] = useState(1);
  const [codigoCliente, setCodigoCliente] = useState("");
  const [clienteDocumento, setClienteDocumento] = useState("");
  const [nextPage, setNextPage] = useState();
  const mediaQueryPadding = useMediaQuery(theme.breakpoints.down(705));
  const clienteDatos = useSelector((state: RootState) => state.clienteDatos.items);
  const loading = useSelector((state: RootState) => state.clienteDatos.loading);

  const router = useRouter();

  useMount(() => {
      dispatch(getProductosAction());
      dispatch(busquedaActions.busquedaRequest());
      dispatch(clienteDatosActions.clienteDatosReset());
      dispatch(clienteDocumentoActions.clienteDocumentoReset()); 
      postAutenticarServicio(keycloakHeaders).then((value) => {            
      localStorage.setItem("gdi-auth", JSON.stringify(value));
      
    }).finally(() => {

    })
  })

  useEffect(() => {
    getTipoBusquedaById(tipoBusquedaSelected).then((response) => {
      setTipoBusqueda(response.data)
    })
  }, [tipoBusquedaSelected]);
    
  return (
    <>
			<Grid container pt={3} style={{ justifyContent: 'center' }}>
				<Box className={styles['box-user']} style={{padding: mediaQueryPadding ? '0px 0px' : '0px'}}>
        <div>
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
                    value={codigoCliente ?? clienteDocumento}
                    onChange={(e) => {setCodigoCliente(e.target.value); setClienteDocumento(e.target.value);}}
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
                      minWidth: 300,
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
