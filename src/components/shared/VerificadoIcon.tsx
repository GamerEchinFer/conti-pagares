import { List, ListItemIcon } from '@mui/material'
import Image from "next/image";
import Verificado from '../../assets/svg/Verificado.svg' 

type VerificadoIconProps = {
//   onClick: () => void,
  imagen?: string;
}

const VerificadoIcon = ({imagen = Verificado}:VerificadoIconProps)  => {
  return (
    <>
      <List
        // onClick={() => onClick()}
        >
        <div className="w-10">
          <Image src={imagen}  alt='certificado' style={{ color:"#5B9FAA"}} />
        </div>
      </List>
    </>
  )
}

export default VerificadoIcon