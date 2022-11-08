import { TextField, Typography } from "@mui/material"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CancelButtonTB from "../../components/Buttons/CancelButtonTB";
import NextButtonTB from "../../components/Buttons/NextButtonTB";
import SearchbarButton from "../../components/Buttons/SearchbarButton";
import Header from "../../components/Header";
import RadioButtonOption from "../../components/RadioButtonOption";
import TBBodyPrincipal from "../../components/TipoBusqueda/TBBodyPrincipal";
import GDITitulosComponent from "../../components/TituloySubtitulo/GDITitulosComponent";
import { TipoBusqueda } from "../../interfaces/interfaces";

const TipoBusquedaPage = () => {
    const [tipoBusqueda, setTipoBusqueda] = useState<TipoBusqueda | null>();
  const [tipoBusquedaSelected, setTipoBusquedaSelected] = useState(1);
  const [nextPage, setNextPage] = useState();

  const router = useRouter();

  useEffect(() => {

        // SE CONFIGURA EL API PARA NEXT
      /*getTipoBusquedaById(tipoBusquedaSelected).then((response) => {
        setTipoBusqueda(response.data)
      })*/
  }, [tipoBusquedaSelected])

  const handleClickNext = () => {
    router.push('/solicitud');
  };

  const handleClickPrevius = () => {
    router.push('/');
  };
  return (
    <>
      <Header />
      <div className="flex">
        <div className="max-w-7xl" style={{ padding: 20, margin: 'auto'}}>
          <GDITitulosComponent />
          <TBBodyPrincipal />
            <div className="flex flex-row gap-8 items-start justify-center pt-8">
              <div className="flex flex-col items-start justify-start gap-7 w-1/8 pt-2">
                <div className="labelRadio">Búsqueda por</div>
                <div className="labelRadio">
                  {tipoBusqueda?.nameTipoBusqueda ?? ""}
                </div>
              </div>
              <div className="flex flex-col items-start justify-content-start gap-4">
                <RadioButtonOption
                  tipoBusquedaSelected={tipoBusquedaSelected} 
                  setTipoBusquedaSelected={setTipoBusquedaSelected} 
                />
                <div className="flex flex-row items-center gap-2">

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
                  <SearchbarButton />
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-center gap-8">
              <CancelButtonTB onClick={handleClickPrevius} />
              <NextButtonTB onClick={handleClickNext} />
            </div>
          </div>
      </div>
    </>
  )
}

export default TipoBusquedaPage
