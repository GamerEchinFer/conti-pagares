import Stack from '@mui/material/Stack';
import { useState } from 'react'
import MoreViewButton from '../Buttons/MoreViewButton';
import CardSolicitudEnCuso from '../SolicitudEnCurso/CardSolicitudEnCurso';
import { useSolicitud } from '../../hooks/useSolicitud';

function SolicitudenCursoComponent() {  

  const [name, setName] = useState(-1)

  const handleChangeActualSolicitud = (event : any) => 
  setName(event.target.value);

  const solicitud = useSolicitud(2)

  if(!solicitud) return null;

  return (
    <>   
      <div className="pt-4">
        <div className="relative">
          <div className="absolute top-1 right-0 h-16 w-16">
          </div>
        </div>
        <div 
          className="text-left pl-10"
            style={{
              color: "#1D428A",
              fontWeight: "bold",
              fontSize:"24px"
            }}
          >
            Solicitud en Curso
        </div> 
        <div 
          className="text-left pl-10 pb-8"
          style={{
            color: "#6C6C6C",
            fontWeight: "400",
            fontSize:"18px"
          }}
        >
          Para consultar y editar solicitudes en curso
        </div> 
        <div className="flex justify-end">
            <Stack direction="row" spacing={2}>
              <CardSolicitudEnCuso />
              <CardSolicitudEnCuso />
              <CardSolicitudEnCuso />
            </Stack>
          </div>
          <MoreViewButton onClick={() => setName(-1)} />
        </div>
    </>
  )
}

export default SolicitudenCursoComponent