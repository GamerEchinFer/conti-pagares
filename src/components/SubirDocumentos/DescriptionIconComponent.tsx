import DescriptionIcon from '@mui/icons-material/Description';
import { ListItemIcon } from '@mui/material';
import Documento from '../../assets/svg/Documento.svg' 
import Image from 'next/image';

type props = {
  imagen? : string;
}
const DescriptionIconComponent = ({imagen = Documento}: props) => {
  return (
    <>
    <div className="flex justify-start">
      {/* <ListItemIcon> */}
        <Image src={imagen}  alt='documento' />
      {/* </ListItemIcon> */}
    </div>
    </>
  )
}

export default DescriptionIconComponent