import { ListItem, ListItemText, Divider } from '@mui/material'
import { SolicitudCliente } from '../interfaces/interfaces';
import ArrowIconNext from './ArrowIconsComponent/ArrowIconNext';

type SolicitudItemProps = {
    solicitud: SolicitudCliente,
    handleChangeNewSolicitud: (item: SolicitudCliente) => void
}

// TODO - Create destructuring using props and replace props for component 
const SolicitudItem = (solicitud: SolicitudItemProps) => {
  return (
    <>
      <ListItem 
          button
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
        <ArrowIconNext />
        </ListItem> 
        <Divider />
    </>
  )
}

export default SolicitudItem