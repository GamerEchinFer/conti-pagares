import React from 'react'
import { ListItemIcon } from '@mui/material';
import Image from "next/image";
import DocBuscar from '../../assets/svg/DocBuscar.svg' 

type ModalHistoricoProps = {
  imagen?: string,
  onClick: () => void,
}

const ModalHistorico = ({onClick,imagen=DocBuscar}: ModalHistoricoProps) => {

  const handleClickModalHistorico = () =>  {

  }
  return (
    <>
      <ListItemIcon
        className="flex items-center justify-center pt-2 pb-2"
        onClick={() => onClick()}
      >
        <button onClick={handleClickModalHistorico}>
          <Image src={imagen} alt='add' style={{color: "#B7B7B7"}}/>
        </button>
      </ListItemIcon>
    </>
  )
}

export default ModalHistorico