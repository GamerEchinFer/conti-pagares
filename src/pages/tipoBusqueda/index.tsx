import { Grid, TextField, Typography } from "@mui/material"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getTipoBusquedaById } from "../../api/gdiApi";
import NextButtonTB from "../../components/Buttons/NextButtonTB";
import SearchbarButton from "../../components/Buttons/SearchbarButton";
import RadioButtonOption from "../../components/RadioButtonOption";
import TBBodyPrincipal from "../../components/TipoBusqueda/TBBodyPrincipal";
import GDITitulosComponent from "../../components/TituloySubtitulo/GDITitulosComponent";
import { TipoBusqueda } from "../../interfaces/interfaces";
import styles from './TipoBusqueda.module.css';
import Archivo from '../../assets/svg/Archivo.svg' 
import Image from "next/image";

type props  = {
  imagen?: string;
}
const TipoBusquedaPage = ({imagen = Archivo} : props) => {
  const [tipoBusqueda, setTipoBusqueda] = useState<TipoBusqueda | null>();
  const [tipoBusquedaSelected, setTipoBusquedaSelected] = useState(1);
  const [nextPage, setNextPage] = useState();

  const router = useRouter();

  useEffect(() => {
      getTipoBusquedaById(tipoBusquedaSelected).then((response) => {
        setTipoBusqueda(response.data)
      })
  }, [tipoBusquedaSelected])

  const handleClickNext = () => {
    router.push('/solicitud');
  };

  const handleClickPrevius = () => {
    router.push('/');
  };
  return (
    <>
			<Grid container pt={3} style={{ justifyContent: 'center' }}>
      <div>
        <div className="justify-around">
          <GDITitulosComponent />
          <TBBodyPrincipal />
        </div>
          <div className="flex flex-row gap-8 items-start justify-center pt-8">
            <div className="flex flex-col items-start justify-content-start gap-4">
              <RadioButtonOption
                tipoBusquedaSelected={tipoBusquedaSelected} 
                setTipoBusquedaSelected={setTipoBusquedaSelected} 
                />
              <div className="flex flex-row items-center gap-2">
                <div className="flex flex-col items-start justify-start gap-7 w-1/8 pt-2">
              <div className="labelRadio">
                {tipoBusqueda?.nameTipoBusqueda ?? ""}
              </div>

                <TextField
                  size="small" 
                  id="outlined-basic"
                  // value={tipoBusquedaSelected} 
                  label={tipoBusqueda?.nameTipoBusqueda ?? ""}
                  variant="outlined"
                  sx={{
                    '& label': { paddingLeft: (theme) => theme.spacing(2) },
                    '& input': { paddingLeft: (theme) => theme.spacing(3.5), },
                    '& fieldset': {
                      paddingLeft: (theme) => theme.spacing(2.5),
                      borderRadius: '0px',
                    },
                  }}
                  />

                </div>
                <SearchbarButton />
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-center gap-8">
            {/* <CancelButtonTB onClick={handleClickPrevius} /> */}
            <NextButtonTB onClick={handleClickNext} />
          </div>
      </div>

        {/* <div className="chat-notification">
          <div className="chat-notification-logo-wrapper">
            <Image className="chat-notification-logo" src={imagen} alt="ChitChat Logo" />
          </div>
          <div className="chat-notification-content">
            <h4 className="chat-notification-title">ChitChat</h4>
            <p className="chat-notification-message">You have a new message!</p>
          </div>
        </div> */}
</Grid>
    </>
  )
}

export default TipoBusquedaPage
