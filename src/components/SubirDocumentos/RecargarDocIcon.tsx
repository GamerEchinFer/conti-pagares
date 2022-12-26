import { List} from '@mui/material'
import Image from "next/image";
import RecargarDocumento from '../../assets/svg/RecargarDocumento.svg' 
import { LightTooltip } from '../shared/LightTooltip';

type RecargarDocIconProps = {
  onClick: () => void,
  imagen?: string;
}

const RecargarDocIcon = ({imagen = RecargarDocumento, onClick}:RecargarDocIconProps)  => {
  return (
    <>
        <List
          onClick={() => onClick()}
          sx={{
            ":hover":
            {
            background:"#BEC400",
            borderRadius: "50%",
            height: "45px",
            width: "45px",
            left: 4,
            }
          }}
        > 
          <LightTooltip
            disableFocusListener
            title="Volver a cargar"
            arrow>
            <div className="relative h-8 w-8">
                <Image src={imagen}  alt='imagenDoc' />
            </div> 
          </LightTooltip>
        </List>
    </>
  )
}

export default RecargarDocIcon