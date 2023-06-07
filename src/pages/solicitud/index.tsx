import List from '@mui/material/List';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SolicitudCliente } from '../../interfaces/interfaces';
import { RootState } from '../../redux/store';
import SolicitudItem from '../../components/SolicitudItem';
import { useRouter } from 'next/router';
import NuevaSolicitudComponent from '../../components/SolicitudComponent/NuevaSolicitudComponent';
import SolicitudenCursoComponent from '../../components/SolicitudComponent/SolicitudenCursoComponent';
import ActualizarDocumentosComponent from '../../components/SolicitudComponent/ActualizarDocumentosComponent';
import ConsultarDocumentosComponent from '../../components/SolicitudComponent/ConsultarDocumentosComponent';
import DatosClienteComponent from '../../components/DatosClienteComponent';
import BackButton from '../../components/Buttons/BackButton';
import { Box, Grid } from '@mui/material';
import styles from "../solicitud/Solicitud.module.css";
import useMediaQuery from '@mui/material/useMediaQuery';
import { theme } from '../../../theme/Theme';
import { solicitudActions } from '../../redux/slices/solicitud.slice';
import { getSolicitudClienteAction } from '../../redux/thunks/solicitud.thunks';

function SolicitudPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const mediaQueryPadding = useMediaQuery(theme.breakpoints.down(705));  

  const solicitudes = useSelector((state: RootState) => state.solicitud.items)
  const solicitud = useSelector((state: RootState) => state.solicitud.solicitudSelected)
  const page = useSelector((state: RootState) => state.solicitud.page)
  const auth = useSelector((state: RootState) => state.authGDI.gdiAuth);
  sessionStorage.removeItem('cargaActual')
  useEffect(() => {
    initialize();
    if (auth && auth.access_token) {
      dispatch(solicitudActions.solicitudRequest())
    }    
    
  }, [auth])


  const initialize = () => {
    if (page === -1) {
      setSolicitud(null)
      dispatch(solicitudActions.setIdProducto(0))
      dispatch(solicitudActions.setIdSubProducto(0))
    }    
    dispatch(getSolicitudClienteAction())
  }

  const setPage = (value: number) => {
    dispatch(solicitudActions.setPage(value))
  }

  const setSolicitud = (value: SolicitudCliente | null) => {
    dispatch(solicitudActions.setSolicitudSelected(value))
  }

  const handleChangeSolicitud = (solicitud: SolicitudCliente) => { 
    setPage(solicitud.id)
    setSolicitud(solicitud)
  }

  const handleClickPrevius = () => {
    if (page === -1) {
      router.push('/tipoBusqueda');
    } else {
      setPage(-1)
      dispatch(solicitudActions.setIdProducto(0))
      dispatch(solicitudActions.setIdSubProducto(0))
    }    
  };

  // Dictionary 
  const items: any = {
    1: <NuevaSolicitudComponent solicitud={solicitud} />,
    2: <SolicitudenCursoComponent  />,
    3: <ActualizarDocumentosComponent />,
    4: <ConsultarDocumentosComponent />
  }
  
  return (
    <>
      <Grid container pt={3} style={{ justifyContent: 'center' }}>
				<Box className={styles['box-user']} style={{padding: mediaQueryPadding ? '0px 0px' : '0px'}}>
          <DatosClienteComponent />
          <div className="pl-9">
            <List 
              component="nav"
              aria-label="activity folders">
              {page === -1 ? solicitudes.map((solicitud) => <SolicitudItem 
                key={solicitud.id}
                solicitud={solicitud}
                handleChangeNewSolicitud={handleChangeSolicitud}
              />
              ) : items[page]}    
            </List>
            <div className="flex flex-row justify-center">
              <BackButton onClick={handleClickPrevius} />          
            </div>
          </div>
        </Box>
      </Grid>
    </>
  )
}
export default SolicitudPage