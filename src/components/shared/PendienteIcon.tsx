import { List, ListItemIcon } from '@mui/material'
import Image from "next/image";
import Pendiente from '../../assets/svg/Pendiente.svg' 
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

type PendienteIconProps = {
//   onClick: () => void,
  imagen?: string;
}

const PendienteIcon = ({imagen = Pendiente}:PendienteIconProps)  => {
  return (
    <>
      <List
        // onClick={() => onClick()}
        >
        <div className="w-10">
          <Image src={imagen}  alt='pendiente' className="absolute bottom-10 right-10 h-10 w-5" style={{ color:"#5B9FAA"}} />
        </div>
      </List>
    </>
  )
}

export default PendienteIcon