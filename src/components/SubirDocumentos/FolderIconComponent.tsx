import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import Image from "next/image";
import Archivo from '../../assets/svg/Archivo.svg' 

import { ListItemIcon } from '@mui/material';

type props = {
  imagen? : string;
}
const FolderIconComponent = ({imagen = Archivo}: props) => {
  return (
    <>
    <div className="flex justify-center">
      {/* <ListItemIcon> */}
      <Image src={imagen}  alt='archivo' />
          {/* <FolderOpenOutlinedIcon 
            sx={{ fontSize: 120,
            pl: 0,
            color: "#1D428A",
            }}
          /> */}
      {/* </ListItemIcon> */}
    </div>
    </>
  )
}

export default FolderIconComponent