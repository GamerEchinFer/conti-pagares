import React, { useState, useEffect } from 'react';
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
  OutlinedInput,
  Table,
  TableBody,
  TableContainer,
} from '@mui/material';
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
import { documentosUserActions } from '../../redux/slices/documentosUser.slice';
import LoadingIcon from '../shared/LoadingIcon';
import SearchIcon from '@mui/icons-material/Search';

function ConsultarDocumentosComponent() {
  const [name, setName] = useState("");
  const [query, setQuery] = useState("");
  const [download, setDownload] = useState("");

  const dispatch = useDispatch();

  const datosCliente = useSelector((state: RootState) => state.clienteDatos.items);
  const documentosUser = useSelector((state: RootState) => state.documentosUser.items);
  const documentosUserMapped = useSelector((state: RootState) => state.documentosUser.itemsMapped);
  const idGroupSelected = useSelector((state: RootState) => state.documentosUser.idGroupSelected);
  const [subGruposActive, setSubGruposActive] = useState<{ [key: string]: boolean }>({});

  const handleChangeNewSolicitud = (event: any) =>
    setName("nuevaSolicitud");

  const solicitud = useSolicitud(4);

  useEffect(() => {
    dispatch(documentosUserActions.setItemsMappedReset());
  }, []);

  useEffect(() => {
    dispatch(getDocumentosUserAction(datosCliente.codigoCliente, idGroupSelected));
    dispatch(documentosUserActions.setIdGroupSelectedReset());
    dispatch(documentosUserActions.documentosUserReset());
    dispatch(tipoDocumentoHistoricoActions.tipoDocumentoHistoricoReset());
  }, []);

  const handleIconBack = () => {
    dispatch(solicitudActions.setPage(-1))
  }

  const handleClickExpand = () => {

  }

  const handleClickCollapse = () => {

  }

  const handleClickButtonFiltro = (idGrupo: number) => {
    const dataMapped = documentUserMapper(documentosUser as DocumentosUsuarioResponse, idGrupo);
    dispatch(documentosUserActions.setItemsMapped(dataMapped));
    dispatch(documentosUserActions.setIdGroupSelected(idGrupo));

    if (!idGrupo) { return null; }
  }

  const handleClickViewDoc = async () => {
  }

  const onClickRow = () => { }

  useEffect(() => {
    const container = document.querySelector('.carousel-container') as HTMLElement;
    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    container.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mouseleave', () => {
      isDown = false;
    });

    container.addEventListener('mouseup', () => {
      isDown = false;
    });

    container.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5; // Aajustar la velocidad de scroll
      container.scrollLeft = scrollLeft - walk;
    });
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 gap-2 pt-4">
        <div
          className="text-left pl-5"
          style={{ color: "#1D428A", fontWeight: "bold", fontSize: "24px" }}
        >
          Documentos del cliente
        </div>
        <div className="relative">
          <div className="absolute top-1 right-0 h-16" style={{ paddingLeft: "70px" }}>
            <ArrowIconBack onClick={handleIconBack} />
          </div>
          </div>
        </div>
        <div className="text-left pl-5 pb-5" style={{ color: "#6C6C6C", fontWeight: "400", fontSize: "18px" }} >
          Consultar el estado de los documentos del cliente
        </div>
        <div className='carousel-container'>

          {
            documentosUser && documentosUser.filtroGrupo ? documentosUser?.filtroGrupo?.map(item =>
              <ButtonFiltro
                key={item.idGrupo}
                onClick={() => handleClickButtonFiltro(item.idGrupo)}
                descripcion={(capitalize(`${item.grupoDescripcion.toLowerCase()}`))}
                active={idGroupSelected === item.idGrupo}
              />
            ) : null
          }
        </div>


        <Box sx={{ width: 950, maxWidth: '100%' }} >
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
                  onChange={(e: any) => setQuery(e.target.value)}
                />
              </FormControl>
              <ButtonIconRefresh onClick={() => window.location.reload()} />
              <ButtonExpand onClick={handleClickExpand} />
              <ButtonCollapse onClick={handleClickCollapse} />
            </div>
          </div>
        </Box>
        <div className="overflow-auto h-56">

          <TableContainer className=''>
            {documentosUser?.filtroGrupo == undefined ?
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                <div className='w-52'>
                  <LoadingIcon />
                </div>
              </div>
              :
              null

            }
            <Table sx={{ minWidth: 850 }} aria-label="simple table">
              <TableBody>
                <DocumentoUserTable
                  documentosUser={documentosUser}
                  query={query}
                  idGroup={idGroupSelected}
                  handleClickViewDoc={handleClickViewDoc}
                />
                <DocumentoUserSubGrupoTable
                  toggle={subGruposActive}
                  setToggle={(value) => console.log(value)}
                  documentosUser={documentosUserMapped}
                  query={query}
                  handleClickViewDoc={handleClickViewDoc}
                  onClickRow={onClickRow}
                />
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </>
    )
  }

  export default ConsultarDocumentosComponent