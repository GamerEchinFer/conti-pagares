import { ListItem, ListItemText, Divider, Box, List } from '@mui/material'
import { useRouter } from 'next/router';
import { SolicitudCliente } from '../interfaces/interfaces';
import ArrowIconNext from './ArrowIconsComponent/ArrowIconNext';

type SolicitudItemProps = {
  solicitud: SolicitudCliente,
  handleChangeNewSolicitud: (item: SolicitudCliente) => void
}

const SolicitudItem = (solicitud: SolicitudItemProps) => {
const router = useRouter();

const handleIconNext = () => {
  router.push('/solicitud')
}
  return (
    <>
     <List sx={{ width: '100%', maxWidth: 860,maxHeight: 360, bgcolor: 'background.paper' }}>
      <ListItem 
        onClick={() => solicitud.handleChangeNewSolicitud(solicitud.solicitud)}
      >
        <ListItemText 
          key={solicitud.solicitud?.id ?? 0}
          primaryTypographyProps={{ style: {
            color: "#1D428A",
            fontWeight: "bold",
            fontSize: "24px",
            cursor: "pointer"
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
        <Divider className="pt-4" />
    </List>
    </>
  )
}

export default SolicitudItem