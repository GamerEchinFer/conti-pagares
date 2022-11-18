import { ListItem, ListItemText, Divider, Box, List } from '@mui/material'
import { useRouter } from 'next/router';
import { SolicitudCliente } from '../interfaces/interfaces';
import ArrowIconNext from './ArrowIconsComponent/ArrowIconNext';

type SolicitudItemProps = {
    solicitud: SolicitudCliente,
    handleChangeNewSolicitud: (item: SolicitudCliente) => void
}

// TODO - Create destructuring using props and replace props for component 
const SolicitudItem = (solicitud: SolicitudItemProps) => {
const router = useRouter();

const handleIconNext = () => {
  router.push('/solicitud')
}
  return (
    <>
     <List sx={{ width: '100%', maxWidth: 660,maxHeight: 360, bgcolor: 'background.paper' }}>
      <ListItem 
          // button
          onClick={() => solicitud.handleChangeNewSolicitud(solicitud.solicitud)}
      >
        <ListItemText 
          key={solicitud.solicitud?.id ?? 0}
          primaryTypographyProps={{ style: {
              color: "#1D428A",
              fontWeight: "bold",
              fontSize: "24px"
            } }}
          primary={solicitud.solicitud?.nameSolicitud ?? ""}
          secondaryTypographyProps={{ style: {
            color: "#6C6C6C",
            fontWeight: "400",
            fontSize: "18px"
          } }}
          secondary={solicitud.solicitud?.nameDetalle ?? ""}
        />
          <ArrowIconNext onClick={handleIconNext}/>
        </ListItem> 
        <Divider />
    </List>
    </>
  )
}

export default SolicitudItem