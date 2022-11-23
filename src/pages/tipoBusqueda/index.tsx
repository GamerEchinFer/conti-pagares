import { Box, Grid, TextField, Typography, useMediaQuery } from "@mui/material"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getTipoBusquedaById } from "../../api/gdiApi";
import NextButtonTB from "../../components/Buttons/NextButtonTB";
import SearchbarButton from "../../components/Buttons/SearchbarButton";
import DatosPersonales from "../../components/DatosPersonales/DatosPersonales";
import RadioButtonOption from "../../components/RadioButtonOption";
import TBBodyPrincipal from "../../components/TipoBusqueda/TBBodyPrincipal";
import GDITitulosComponent from "../../components/TituloySubtitulo/GDITitulosComponent";
import { TipoBusqueda, SolicitudCliente } from '../../interfaces/interfaces';
import styles from './TipoBusqueda.module.css';
import Archivo from '../../assets/svg/Archivo.svg' 
import Image from "next/image";
import { theme } from "../../../theme/Theme";
import { useDispatch } from 'react-redux';
import { solicitudActions } from '../../redux/slices/solicitud.slice';

type props  = {
  imagen?: string;
}

const TipoBusquedaPage = ({imagen = Archivo} : props) => {

  const dispatch = useDispatch()

  const [tipoBusqueda, setTipoBusqueda] = useState<TipoBusqueda | null>();
  const [tipoBusquedaSelected, setTipoBusquedaSelected] = useState(1);
  const [codigoCliente, setCodigoCliente] = useState("")
  const [nextPage, setNextPage] = useState();
  const mediaQueryPadding = useMediaQuery(theme.breakpoints.down(705));

  const router = useRouter();

  useEffect(() => {
      getTipoBusquedaById(tipoBusquedaSelected).then((response) => {
        setTipoBusqueda(response.data)
      })
  }, [tipoBusquedaSelected])

  const handleClickNext = () => {
    dispatch(solicitudActions.setPage(-1))
    router.push('/solicitud');
  };

  const handleClickPrevius = () => {
    router.push('/');
  };
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
                    value={codigoCliente}
                    onChange={(e) => setCodigoCliente(e.target.value)}
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
                  <SearchbarButton active={codigoCliente.length > 0} />
                 </div>
              </div>
            </div>
          </div>
          <DatosPersonales />
        </div>
        <div className="flex flex-row justify-center gap-8 pb-8">
            <NextButtonTB onClick={handleClickNext} />
          </div>
        </Box>
      </Grid>
    </>
  )
}

export default TipoBusquedaPage
