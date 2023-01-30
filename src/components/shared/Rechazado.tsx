import { List, ListItemIcon } from '@mui/material'
import Image from "next/image";
import Rechazado from '../../assets/svg/Rechazado.svg' 

type RechazadoIconProps = {
//   onClick: () => void,
  imagen?: string;
}

const RechazadoIcon = ({imagen = Rechazado}:RechazadoIconProps)  => {
  return (
    <>
      <List
        // onClick={() => onClick()}
        >
        <div className="w-10">
          <Image src={imagen}  alt='rechazado' style={{ color:"#5B9FAA"}} />
        </div>
      </List>
    </>
  )
}

export default RechazadoIcon