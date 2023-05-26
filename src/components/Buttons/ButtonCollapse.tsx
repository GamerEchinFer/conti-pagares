import { List, ListItemIcon } from '@mui/material'
import Image from "next/image";
import collapse from '../../assets/svg/collapse.svg' 

type ButtonCollapseProps = {
  onClick: () => void,
  imagen?: string;
}

const ButtonCollapse = ({imagen = collapse,onClick}:ButtonCollapseProps)  => {
  return (
    <>
      <List
        onClick={() => onClick()}
        >
            <button>
                <div className="relative h-10 w-10">
                    <Image src={imagen}  alt='collapse' className="absolute top-0 right-0 h-8 w-8" />
                </div>
            </button>
      </List>
    </>
  )
}

export default ButtonCollapse