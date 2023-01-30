import { List, ListItemIcon } from '@mui/material'
import Image from "next/image";
import Refresh from '../../assets/svg/Refresh.svg'

type ButtonIconRefreshrops = {
  onClick: () => void,
  imagen?: string;
}

const ButtonIconRefresh= ({imagen = Refresh,onClick}:ButtonIconRefreshrops)  => {
  return (
    <>
      <List
        onClick={() => onClick()}
        >
          <button>
            <div className="relative h-10 w-10">
              {/* <RefreshRoundedIcon className="" style={{color:"#C5C5C5"}} /> */}
              <Image src={imagen}  alt='refresh' className="absolute top-0 right-0 h-8 w-7" />
            </div>
          </button>
      </List>
    </>
  )
}

export default ButtonIconRefresh