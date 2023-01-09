import { List} from '@mui/material'
import Image from "next/image";
import { useState } from 'react';
import RecargarDocumento from '../../assets/svg/RecargarDocumento.svg' 
import { LightTooltip } from '../shared/LightTooltip';
import CheckDocumento from '../../assets/svg/CheckDocumento.svg' 

type RecargarDocIconProps = {
  onClick: () => void,
  imagen?: string;  
}

const RecargarDocIcon = ({imagen = CheckDocumento, onClick}:RecargarDocIconProps)  => {

  const [isCheckedIcon, setisCheckedIcon] = useState(true)

  return (
    <>
        <List
          onMouseOver={() => setisCheckedIcon(false)}
          onMouseOut={() => setisCheckedIcon(true)}
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
                <Image src={ isCheckedIcon ? imagen : RecargarDocumento}  alt='imagenDoc' className='w-100'/>
            </div> 
          </LightTooltip>
        </List>
    </>
  )
}

export default RecargarDocIcon