import { List, ListItemIcon } from '@mui/material'
import Image from "next/image";
import Certificado from '../../assets/svg/Certificado.svg' 

type CertificadoIconProps = {
//   onClick: () => void,
  imagen?: string;
}

const CertificadoIcon = ({imagen = Certificado}:CertificadoIconProps)  => {
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

export default CertificadoIcon