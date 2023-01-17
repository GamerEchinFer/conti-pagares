import List from '@mui/material/List';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useMount} from 'ahooks'
// import { getAllSolicitudClienteAction } from '../../redux/thunks/solicitud.thunks';
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
import { postAutenticarServicio } from '../../api/keycloakApi';
import { keycloakHeaders } from '../../constants/constants';
import { getSolicitudClienteAction } from '../../redux/thunks/solicitud.thunks';

function SolicitudPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const mediaQueryPadding = useMediaQuery(theme.breakpoints.down(705));  

  // const [solicitud, setSolicitud] = useState<SolicitudCliente | null>(null)
  // const [page, setPage] = useState(-1)

  //const solicitudes = useSolicitudes()
  const solicitudes = useSelector((state: RootState) => state.solicitud.items)
  const solicitud = useSelector((state: RootState) => state.solicitud.solicitudSelected)
  const page = useSelector((state: RootState) => state.solicitud.page)

  // refrescar cada página con un request y un  dispatch de definición de esta página.
  useMount(() => {
    initialize();
    dispatch(solicitudActions.solicitudRequest())
    postAutenticarServicio(keycloakHeaders).then((value) => {            
      localStorage.setItem("gdi-auth", JSON.stringify(value));
      dispatch(getSolicitudClienteAction())
    }).finally(() => {
        
    })
  })


  const initialize = () => {
    // Cuando esta en la pagina inicial donde muestran la lista de solicitudes se hara las siguientes acciones
    if (page === -1) {
      setSolicitud(null)
      // Inicializar con los valores por defecto
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