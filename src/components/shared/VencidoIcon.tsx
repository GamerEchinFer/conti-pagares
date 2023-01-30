import { List, ListItemIcon } from '@mui/material'
import Image from "next/image";
import Vencido from '../../assets/svg/Vencido.svg' 

type VencidoIconProps = {
//   onClick: () => void,
  imagen?: string;
}

const VencidoIcon = ({imagen = Vencido}:VencidoIconProps)  => {
  return (
    <>
      <List
        // onClick={() => onClick()}
        >
        <div className="w-10">
          <Image src={imagen}  alt='rechazado' style={{color: "#FCAC00"}} />
        </div>
      </List>
    </>
  )
}

export default VencidoIcon