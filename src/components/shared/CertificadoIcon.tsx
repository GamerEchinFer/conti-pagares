import { List } from '@mui/material'
import Image from "next/image";
import Certificado2 from '../../assets/svg/Certificado2.svg' 

type CertificadoIconProps = {
  imagen?: string;
}

const CertificadoIcon = ({imagen = Certificado2}:CertificadoIconProps)  => {
  return (
    <>
      <List>
        <div className="w-10">
          <Image src={imagen}  alt='certificado' style={{ color:"#5B9FAA"}} />
        </div>
      </List>
    </>
  )
}

export default CertificadoIcon