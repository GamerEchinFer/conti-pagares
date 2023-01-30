import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSolicitud } from '../../hooks/useSolicitud';
import { solicitudActions } from '../../redux/slices/solicitud.slice';
import ArrowIconBack from '../ArrowIconsComponent/ArrowIconBack';
import ButtonFiltro from '../Buttons/ButtonFiltro';
import { Box, FormControl, InputAdornment, InputLabel, ListItem, ListItemText, OutlinedInput, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { getDocumentosUserAction } from '../../redux/thunks/documentosUser.thunks';
import { RootState } from '../../redux/store';
import ButtonExpand from '../Buttons/ButtonExpand';
import ButtonCollapse from '../Buttons/ButtonCollapse';
import Paper from '@mui/material/Paper';
import { capitalize } from '../../helpers/capitalize';
import PendienteIcon from '../shared/PendienteIcon';
import CertificadoIcon from '../shared/CertificadoIcon';
import RechazadoIcon from '../shared/Rechazado';
import VencidoIcon from '../shared/VencidoIcon';
import ButtonIconRefresh from '../Buttons/ButtonIconRefresh';


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
  const handleClickButtonFiltro = () => {
    
  }

  const [ query, setQuery ] = useState("");
  
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
              <ButtonFiltro key={item.idGrupo} onClick={handleClickButtonFiltro} descripcion={(capitalize(`${item.grupoDescripcion}`))} />
            ) : null
          }          
        </ListItem>
      </div>

      <Box
        sx={{ width: 950, maxWidth: '100%'}}
      >
        <div className="pb-10">
          <div className="flex flex-row justify-content-center items-center">
            <FormControl fullWidth>
              <InputLabel htmlFor="outlined-adornment-amount" >
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
            <ButtonIconRefresh onClick={handleClickExpand} />
            <ButtonExpand onClick={handleClickExpand} />
            <ButtonCollapse onClick={handleClickCollapse} />
          </div>
        </div>
      </Box>

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 850 }} aria-label="simple table">
        <TableBody>
          {
            documentosUser && documentosUser.coleccionDocumento ? documentosUser.coleccionDocumento.map(row => (
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              key={row.datosAdicionales.idDocumento}
            >
              <TableCell 
                align="left"
                style={{
                  fontWeight: "200",
                  fontSize:"16px"
                }}
              >
                <div className="flex justify-start pl-8">
                  {(capitalize(`${row.datosAdicionales.descripcion}`))}
                </div>
              </TableCell>
              
              <TableCell
                style={{
                  color:"#1D428A",
                  fontWeight: "200",
                  fontSize:"16px"
                }}
              >
                <button>
                  Consultar Histórico
                </button>
              </TableCell>

              <TableCell>
                {/* {(capitalize(`${row.datosAdicionales.codigoEstadoDocumento}`))} */}
                <div className="flex justify-start pr-20">
                  {(() => {
                    switch(capitalize(`${row.datosAdicionales.codigoEstadoDocumento}`)) {
                      case 'Pendiente':
                        return <span style={{color: "#5B9FAA"}}>Pendiente</span>
                      case 'Certificado':
                        return <span style={{color: "#BEC400"}}>Certificado</span>
                      case 'Rechazado':
                        return <span style={{color:"#D12103"}}>Rechazado</span>
                      case 'Verificado':
                        return <span style={{color:""}}>Verificado</span>
                      case 'Vencido':
                        return <span style={{color: "#FCAC00"}}>Vencido</span>
                      default:
                        return null
                    }
                  })()}
                </div>
              </TableCell>

              <TableCell
                align="left"
              >
                <div className="flex justify-start pr-20">
                  {(() => {
                    switch(capitalize(`${row.datosAdicionales.codigoEstadoDocumento}`)) {
                      case 'Pendiente':
                        return <PendienteIcon />
                      case 'Certificado':
                        return <CertificadoIcon />
                      case 'Rechazado':
                        return <RechazadoIcon />
                      case 'Verificado':
                        return <PendienteIcon />
                      case 'Vencido':
                        return <VencidoIcon />
                      default:
                        return null
                    }
                  })()}
                </div>
              </TableCell>
            </TableRow>
            )): null
            }

            <TableRow>
              <TableCell
                align="left"
                style={{
                  fontWeight:"600",
                  fontSize:"16px",
                  color:"#1D428A"
                }}>
                {
                  (capitalize(`${documentosUser?.filtroGrupo[0].filtroSubgrupo[0].subgrupoDescripcion}`))
                }
              </TableCell>
              <TableCell
                align="right"
                style={{
                  fontWeight:"600",
                  fontSize:"16px",
                  color:"#1D428A"
                }}>
                
              </TableCell>

            </TableRow>

            <TableRow>
              <TableCell
                align="left"
                style={{
                  fontWeight:"600",
                  fontSize:"16px",
                  color:"#1D428A"
                }}>
                {
                  (capitalize(`${documentosUser?.filtroGrupo[0].filtroSubgrupo[1].subgrupoDescripcion}`))
                }
              </TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </>
  ) 
}

export default ConsultarDocumentosComponent