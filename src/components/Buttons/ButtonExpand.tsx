import { List, ListItemIcon } from '@mui/material'
import Image from "next/image";
import expand from '../../assets/svg/expand.svg' 

type ButtonExpandProps = {
  onClick: () => void,
  imagen?: string;
}

const ButtonExpand = ({imagen = expand,onClick}:ButtonExpandProps)  => {
  return (
    <>
      <List
        onClick={() => onClick()}
        >
            <button>
                <div className="relative h-10 w-10">
                    <Image src={imagen}  alt='expand' className="absolute top-0 right-0 h-8 w-8" />
                </div>
            </button>
      </List>
    </>
  )
}

export default ButtonExpand