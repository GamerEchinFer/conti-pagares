import Stack from '@mui/material/Stack';
import { Card, CardContent, Typography } from '@mui/material';
import { useState } from 'react'
import MoreViewButton from '../Buttons/MoreViewButton';
import CardSolicitudEnCuso from '../SolicitudEnCurso/CardSolicitudEnCuso';
import ButtonVerSolicitud from '../Buttons/ButtonVerSolicitud';
import ArrowIconBack from '../ArrowIconsComponent/ArrowIconBack';
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
            <ArrowIconBack />
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
                {/* <Card sx={{ maxWidth: 316 }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    872767 - Apertura de Cuenta Caja de Ahorro Persona Fisica
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      6 de 6 Documentos Cargados
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      3 de 6 Documentos Verificados
                    </Typography>
                    <div className="flex justify-end">
                    <ButtonVerSolicitud onClick={() => setName(-1)}/>
                    </div>
                  </CardContent>
                </Card>
                <Card sx={{ maxWidth: 316 }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    872767 - Apertura de Cuenta Caja de Ahorro Persona Fisica
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      6 de 6 Documentos Verificados
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      2 de 6 Documentos Vencidos
                    </Typography>
                    <div className="flex justify-end">
                    <ButtonVerSolicitud onClick={() => setName(-1)}/>
                    </div>
                  </CardContent>
                </Card> */}
            </Stack>
          </div>
          <MoreViewButton onClick={() => setName(-1)} />
        </div>
    </>
  )
}

export default SolicitudenCursoComponent