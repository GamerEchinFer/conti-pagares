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
            {/* <button> */}
                <div className="w-10">
                    
                    {/* <Image src={imagen}  alt='pendiente' className="absolute top-0 right-0 h-8 w-8" /> */}
                    <WarningAmberIcon style={{ color:"#5B9FAA"}} />
                </div>
            {/* </button> */}
      </List>
    </>
  )
}

export default PendienteIcon