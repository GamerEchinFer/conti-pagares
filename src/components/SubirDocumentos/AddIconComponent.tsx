import React from 'react'
import { ListItemButton, ListItemIcon } from '@mui/material';
import Image from "next/image";
import Add from '../../assets/svg/Add.svg' 


type AddIconComponentProps = {
  imagen?: string,
  onClick: () => void
}

const AddIconComponent = ({onClick, imagen=Add}: AddIconComponentProps) => {
  return (
    <>
      <ListItemIcon
        className="flex items-center justify-center pt-2 pb-2"
        onClick={() => onClick()}
      >
        <ListItemButton>
          <Image src={imagen} alt='add' />
        </ListItemButton>
      </ListItemIcon>
    </>
  )
}

export default AddIconComponent