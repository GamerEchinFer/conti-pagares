import List from '@mui/material/List';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useMount} from 'ahooks'
import { getAllSolicitudClienteAction } from '../../redux/thunks/solicitud.thunks';
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

function SolicitudPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [solicitud, setSolicitud] = useState<SolicitudCliente | null>(null)
  const [page, setPage] = useState(-1)

  //const solicitudes = useSolicitudes()
  const solicitudes = useSelector((state: RootState) => state.solicitud.items)
  useMount(() => {
    dispatch(getAllSolicitudClienteAction())
  })

  const handleChangeSolicitud = (solicitud: SolicitudCliente) => { 
    setPage(solicitud.id)
    setSolicitud(solicitud)
  }

  const handleClickPrevius = () => {
    router.push('/tipoBusqueda');
  };

  const handleClickNext = () => {
    router.push('/subirDocumentos');
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
    {/* <Header/> */}
    <div className="flex">
      <div className="max-w-7xl" style={{ padding: 20, margin: 'auto'}}>
        <DatosClienteComponent />
        <div className="pl-9">
          <List 
            component="nav"
            aria-label="activity folders">
            {page === -1 ? solicitudes.map((solicitud) => <SolicitudItem 
                key={solicitud.id}
                solicitud={solicitud}
                handleChangeNewSolicitud={handleChangeSolicitud}
            />) : items[page]}            
          </List>
        </div>
        <div className="flex flex-row justify-center gap-8">
          <BackButton onClick={handleClickPrevius}/>          
        </div>
      </div>
    </div>    
  </>
  )
}
export default SolicitudPage