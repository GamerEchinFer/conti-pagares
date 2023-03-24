import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSolicitud } from '../../hooks/useSolicitud';
import { solicitudActions } from '../../redux/slices/solicitud.slice';
import ArrowIconBack from '../ArrowIconsComponent/ArrowIconBack';
import ButtonFiltro from '../Buttons/ButtonFiltro';
import { 
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  ListItem,
  OutlinedInput,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
 } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { getDocumentosUserAction } from '../../redux/thunks/documentosUser.thunks';
import { RootState } from '../../redux/store';
import ButtonExpand from '../Buttons/ButtonExpand';
import ButtonCollapse from '../Buttons/ButtonCollapse';
import { capitalize } from '../../helpers/capitalize';
import ButtonIconRefresh from '../Buttons/ButtonIconRefresh';
import DocumentoUserTable from '../ConsultarDocumentos/DocumentoUserTable';
import DocumentoUserSubGrupoTable from '../ConsultarDocumentos/DocumentoUserSubGrupoTable';
import { tipoDocumentoHistoricoActions } from '../../redux/slices/documentoHistorico.slice';
import { documentUserMapper } from '../../helpers/documentUserMapper';
import { DocumentosUsuarioResponse } from '../../interfaces/interfaces';
import { documentosUserActions, documentosUser } from '../../redux/slices/documentosUser.slice';
import { documentosUserFiltroActions } from '../../redux/slices/documentosUserFiltro';

function ConsultarDocumentosComponent() {
  const [ name, setName ] = useState("");
  const [ query, setQuery ] = useState("");
  const [grupoDocumento, setGrupoDocumento] = useState("");


  const dispatch = useDispatch(); 

  const documentosUser = useSelector((state: RootState) => state.documentosUser.items);        
  const documentosUserMapped = useSelector((state: RootState) => state.documentosUser.itemsMapped);    
  const [subGruposActive, setSubGruposActive] = useState<{[key: string]: boolean}>({});

  const handleChangeNewSolicitud = (event : any) =>
  setName("nuevoSolicitud");

  const solicitud = useSolicitud(4)

  //TODO: Dinamic not Static
  useEffect(() => {
    dispatch(getDocumentosUserAction("000666", 16, ));
    {JSON.stringify(getDocumentosUserAction)}
    dispatch(tipoDocumentoHistoricoActions.tipoDocumentoHistoricoReset());
    
  }, [])

  const handleIconBack = () => {
    // router.push('/solicitud');
    dispatch(solicitudActions.setPage(-1))
  }

  const handleClickExpand = () => {

  }  
  const handleClickCollapse = () => {

  }  
  const handleClickButtonFiltro = (idGrupo: number) => {
    const dataMapped = documentUserMapper(documentosUser as DocumentosUsuarioResponse, idGrupo)
    
    dispatch(documentosUserActions.setItemsMapped(dataMapped)) 
  }

  const handleClickViewDoc = () => {
    
  }


  // if(!solicitud) return null;

  // <SolicitudItem 
  //   solicitud={solicitud}
  //   handleChangeNewSolicitud={handleChangeNewSolicitud}

  const documentosUserFilter = documentosUser && documentosUser.coleccionDocumento ? documentosUser.coleccionDocumento
  .filter((index) =>
    index.datosAdicionales.descripcion.trim().toLowerCase().includes(query.trim().toLowerCase())
  ) : []

  const grupoDocumentosFilter = documentosUser && documentosUser.coleccionDocumento ? documentosUser.coleccionDocumento
  .filter((index) =>
    index.datosAdicionales.descripcion.trim().toLowerCase().includes(grupoDocumento.trim().toLowerCase())
  ) : []
  
  return (
    <>      
      <div className="grid grid-cols-2 gap-2 pt-4">         
        <div 
          className="text-left pl-5"
          style={{ color: "#1D428A", fontWeight: "bold", fontSize:"24px" }}
        >
          Consultar Documentos
        </div>  
        <div className="relative">
          <div className="absolute top-1 right-0 h-16" style={{paddingLeft: "70px"}}>
            <ArrowIconBack onClick={handleIconBack}/>
          </div>
        </div>
      </div>                                              
      <div className="text-left pl-5 pb-5" style={{ color: "#6C6C6C", fontWeight: "400", fontSize:"18px" }} >
        Para consultar el estado de los documentos cargados del cliente 
      </div>
      <div className="flex justify-start">
        <ListItem className="right-20 bottom-10">
          {            
            documentosUser && documentosUser.filtroGrupo ? documentosUser?.filtroGrupo?.map(item => 
              <ButtonFiltro 
                key={item.idGrupo}
                onClick={() => handleClickButtonFiltro(item.idGrupo)}
                descripcion={(capitalize(`${item.grupoDescripcion}`))} 
                />
                ): null
              } 
        </ListItem>
      </div>  

      <Box sx={{ width: 950, maxWidth: '100%'}} >
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
                      <button> <SearchIcon /> </button>
                    </InputAdornment>}
                  label="Buscar Documento"
                  onChange={(e:any) => setQuery(e.target.value)}
                />                             
              </FormControl>
              <ButtonIconRefresh onClick={handleClickExpand} />
              <ButtonExpand onClick={handleClickExpand} />
              <ButtonCollapse onClick={handleClickCollapse} />
          </div>
        </div>
      </Box>
      <div className="overflow-auto h-96">
    <TableContainer>
      <Table sx={{ minWidth: 850 }} aria-label="simple table">
        <TableBody>
          <DocumentoUserTable 
            documentosUser={documentosUser} 
            query={query}
            handleClickViewDoc={handleClickViewDoc} 
          />
  {/* 
              <DocumentoUserSubGrupoTable 
              toggle={subGruposActive}
              setToggle={(value) => console.log(value)}
              documentosUser={documentosUserMapped} 
              query={query} 
              handleClickViewDoc={handleClickViewDoc} /> */}
            <TableRow>
              <TableCell
                align="left"
                style={{ fontWeight:"600", fontSize:"16px", color:"#1D428A" }}>
                {/* <DocumentoUserSubGrupoTable 
                  toggle={subGruposActive}
                  setToggle={(value) => console.log(value)}
                  documentosUser={documentosUserMapped} 
                  query={query} 
                  handleClickViewDoc={handleClickViewDoc} 
                /> */}
              </TableCell>
            </TableRow>  
            <DocumentoUserSubGrupoTable 
              toggle={subGruposActive}
              setToggle={(value) => console.log(value)}
              documentosUser={documentosUserMapped} 
              query={query} 
              handleClickViewDoc={handleClickViewDoc}
            />
              {JSON.stringify(documentosUser)}  
        </TableBody>           
      </Table>
    </TableContainer>
    </div>
    </>
  ) 
}

export default ConsultarDocumentosComponent