import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSolicitud } from '../../hooks/useSolicitud';
import { solicitudActions } from '../../redux/slices/solicitud.slice';
import ArrowIconBack from '../ArrowIconsComponent/ArrowIconBack';
import SolicitudItem from '../SolicitudItem';
import ButtonFiltro from '../Buttons/ButtonFiltro';
import { Box, FormControl, IconButton, Input, InputAdornment, InputLabel, ListItem, OutlinedInput, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function ConsultarDocumentosComponent() {
  const [name, setName] = useState("")
  const dispatch = useDispatch(); 

  const handleChangeNewSolicitud = (event : any) =>
  setName("nuevoSolicitud");

  const solicitud = useSolicitud(4)

  const handleIconBack = () => {
    // router.push('/solicitud');
    dispatch(solicitudActions.setPage(-1))
  }

  const handleClickSearch = () => {

  }
  
  if(!solicitud) return null;

  // <SolicitudItem 
  //   solicitud={solicitud}
  //   handleChangeNewSolicitud={handleChangeNewSolicitud}
  // />
  return (
    <>
      <div className="grid grid-cols-2 gap-2 pt-4">      
        <div 
          className="text-left pl-5"
          style={{
            color: "#1D428A",
            fontWeight: "bold",
            fontSize:"24px"
          }}
        >
          Consultar Documentos
        </div>  
        <div className="relative">
          <div className="absolute top-1 right-0 h-16" style={{paddingLeft: "70px"}}>
            <ArrowIconBack onClick={handleIconBack}/>
          </div>
        </div>
      </div>                                              
      <div 
        className="text-left pl-5"
        style={{
          color: "#6C6C6C",
          fontWeight: "400",
          fontSize:"18px"
        }}
      >
        Para consultar el estado de los documentos cargados del cliente 
      </div>
      <div className="flex justify-start">
        <ListItem className="">
          <ButtonFiltro onClick={handleIconBack}/>
        </ListItem>
      </div>

      <Box
        sx={{ width: 500, maxWidth: '100%'}}
      >
        <div className="">
          <div>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">
            Buscar Documento
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            endAdornment={
            <InputAdornment position="end">
                <SearchIcon />
            </InputAdornment>}
            label="Amount"
          />
        </FormControl>
          </div>
        </div>

      </Box>
    </>
  ) 
}

export default ConsultarDocumentosComponent