import React from 'react'
import Image from 'next/image';
import Cierre from '../../assets/svg/Cierre.svg' 
import { ListItemIcon, ListItemButton } from '@mui/material';


type ButtonIconCloseProps = {
  onClick: () => void,
  imagen?: string,
  autoFocus?: boolean
}

const ButtonIconClose = ({onClick, imagen=Cierre, autoFocus}: ButtonIconCloseProps) => {
  return (
    <>
      <ListItemIcon
        onClick={() => onClick()}
      >
        <ListItemButton>
        <Image src={imagen}  alt='cierre' />
        </ListItemButton>
      </ListItemIcon>
    </>
  )
}

export default ButtonIconClose