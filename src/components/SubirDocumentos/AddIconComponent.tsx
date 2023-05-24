import React from 'react'
import { ListItemIcon } from '@mui/material';
import Image from "next/image";
import Add from '../../assets/svg/Add.svg' 

type AddIconComponentProps = {
  imagen?: string,
  onClick: () => void
}

const AddIconComponent = ({onClick,imagen=Add}: AddIconComponentProps) => {

  const handleClickAdd = () =>  {}
  
  return (
    <>
      <ListItemIcon
        className="flex items-center justify-center pt-2 pb-2"
        onClick={() => onClick()}
      >
        <button onClick={handleClickAdd}>
          <Image src={imagen} alt='add' />
        </button>
      </ListItemIcon>
    </>
  )
}

export default AddIconComponent