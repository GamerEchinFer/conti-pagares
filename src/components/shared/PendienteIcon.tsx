import { List } from '@mui/material'
import Image from "next/image";
import Pendiente from '../../assets/svg/Pendiente.svg' 

type PendienteIconProps = {
  imagen?: string;
}

const PendienteIcon = ({imagen = Pendiente}:PendienteIconProps)  => {
  return (
    <>
      <List>
        <div className="w-10">
          <Image src={imagen}  alt='pendiente' style={{ color:"#5B9FAA"}} />
        </div>
      </List>
    </>
  )
}

export default PendienteIcon