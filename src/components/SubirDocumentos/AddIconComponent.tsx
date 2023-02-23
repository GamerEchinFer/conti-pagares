import React from 'react'
import { ListItemButton, ListItemIcon } from '@mui/material';
import Image from "next/image";
import Add from '../../assets/svg/Add.svg' 


type AddIconComponentProps = {
  imagen?: string,
  onClick: () => void
}

const AddIconComponent = ({onClick,imagen=Add}: AddIconComponentProps) => {

  const handleClickAdd = () =>  {

  }
  return (
    <>
    {/* TODO: one Modal, use api, design in modal, use api in modal */}
      <ListItemIcon
        className="flex items-center justify-center pt-2 pb-2"
        onClick={() => onClick()}
      >
        <ListItemButton>
          <button onClick={handleClickAdd}>
            <Image src={imagen} alt='add' />
          </button>
        </ListItemButton>
      </ListItemIcon>
    </>
  )
}

export default AddIconComponent