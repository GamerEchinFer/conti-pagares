import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSolicitud } from '../../hooks/useSolicitud';
import { solicitudActions } from '../../redux/slices/solicitud.slice';
import ArrowIconBack from '../ArrowIconsComponent/ArrowIconBack';
import SolicitudItem from '../SolicitudItem';
import ButtonFiltro from '../Buttons/ButtonFiltro';
import { Box, FormControl, IconButton, Input, InputAdornment, InputLabel, ListItem, ListItemText, OutlinedInput, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { getDocumentosUserAction } from '../../redux/thunks/documentosUser.thunks';
import { documentosUser } from '../../redux/slices/documentosUser.slice';
import { RootState } from '../../redux/store';
import ButtonExpand from '../Buttons/ButtonExpand';
import ButtonCollapse from '../Buttons/ButtonCollapse';
import Paper from '@mui/material/Paper';
import { capitalize, capitalizePorPalabra } from '../../helpers/capitalize';
import PendienteIcon from '../shared/PendienteIcon';


function ConsultarDocumentosComponent() {
  const [name, setName] = useState("")
  const dispatch = useDispatch(); 

  const documentosUser = useSelector((state: RootState) => state.documentosUser.items);        

  const handleChangeNewSolicitud = (event : any) =>
  setName("nuevoSolicitud");

  const solicitud = useSolicitud(4)

  useEffect(() => {
    dispatch(getDocumentosUserAction("000666"))    
  }, [])

  const handleIconBack = () => {
    // router.push('/solicitud');
    dispatch(solicitudActions.setPage(-1))
  }

  const handleClickSearch = () => {

  }  
  const handleClickExpand = () => {

  }  
  const handleClickCollapse = () => {

  }  
  
  // if(!solicitud) return null;

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
          {            
            documentosUser && documentosUser.filtroGrupo ? documentosUser?.filtroGrupo?.map(item => 
              <ButtonFiltro key={item.idGrupo} onClick={handleIconBack} descripcion={(capitalize(`${item.grupoDescripcion}`))} />
            ) : null
          }          
        </ListItem>
      </div>

      {/* <div>
        {
          documentosUser && documentosUser.coleccionDocumento ? documentosUser.coleccionDocumento.map(item => (
            <ListItem key={item.datosAdicionales.idDocumento}>
              <ListItemText 
              primary={item.datosAdicionales.descripcion} 
              primaryTypographyProps={{ style: {
                color: "#373A3C",
                fontWeight: "normal",
                fontSize: "16px !important"
              } }}              
              />              
            </ListItem>
          )) : null
        }
      </div> */}

      <Box
        sx={{ width: 800, maxWidth: '100%'}}
      >
        <div className="pb-10">
          <div className="flex flex-row justify-content-center items-center">
            <FormControl fullWidth>
              <InputLabel htmlFor="outlined-adornment-amount">
                Buscar Documento
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                endAdornment={
                <InputAdornment position="end">
                  <button>
                    <SearchIcon />
                  </button>
                </InputAdornment>}
                label="Buscar Documento"
              />
            </FormControl>
            <ButtonExpand onClick={handleClickExpand} />
            <ButtonCollapse onClick={handleClickCollapse} />
          </div>
        </div>
      </Box>

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {
            documentosUser && documentosUser.coleccionDocumento ? documentosUser.coleccionDocumento.map(row => (
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              key={row.datosAdicionales.idDocumento}
            >
              {/* <TableCell component="th" scope="row">
                {row.name}
              </TableCell> */}
              <TableCell 
              align="left"
              style={{
                fontWeight: "200",
                fontSize:"16px"
              }}
              >{(capitalize(`${row.datosAdicionales.descripcion}`))}</TableCell>
              
              <TableCell
                style={{
                  color:"#1D428A",
                  fontWeight: "200",
                  fontSize:"16px"
                }}
                >
                Consultar Histórico
              </TableCell>
              <TableCell
                style={{
                  fontWeight:"200",
                  fontSize:"16px",
                  color:"#FCAC00"
                }}>
              {(capitalize(`${row.datosAdicionales.codigoEstadoDocumento}`))}
              </TableCell>
              <TableCell
                align="left"
              >
                <PendienteIcon />
              </TableCell>
            </TableRow>
            )): null}
          
        </TableBody>
      </Table>
    </TableContainer>
    </>
  ) 
}

export default ConsultarDocumentosComponent