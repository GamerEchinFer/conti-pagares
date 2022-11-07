import { useState } from 'react'
import SolicitudItem from '../SolicitudItem';
import { useSolicitud } from '../../hooks/useSolicitud';

function ActualizarDocumentosComponent() {
  const [name, setName] = useState("")
  
  const handleChangeNewSolicitud = (event : any) =>
  setName("nuevoSolicitud");

  const solicitud = useSolicitud(3)

  if(!solicitud) return null;

  return(
    <>
      <SolicitudItem 
      solicitud={solicitud}
      handleChangeNewSolicitud={handleChangeNewSolicitud}
    /> 
    </>
  ) 
}

export default ActualizarDocumentosComponent