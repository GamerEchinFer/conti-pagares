import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import Image from "next/image";
import Delete from '../../assets/svg/delete.svg';
import { red } from '@mui/material/colors';
import { ListItemIcon } from '@mui/material';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

type props = {
  imagen? : string,
  onClick? : () => void
}

const ButtonDelete = ({imagen = Delete, onClick}: props) => {
  return (
    <>
      <ListItemIcon 
        className="pl-12 pt-8"
        onClick={onClick}
      >
        <Image src={imagen}  alt='docPDF' className="w-4 cursor-pointer" />
      </ListItemIcon>
    </>
  )
}

export default ButtonDelete