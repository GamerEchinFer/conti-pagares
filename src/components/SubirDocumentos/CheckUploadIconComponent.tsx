import { Button, List} from '@mui/material'
import Image from "next/image";
import CheckDocumento from '../../assets/svg/CheckDocumento.svg' 
import RecargarDocumento from '../../assets/svg/RecargarDocumento.svg' 
import { LightTooltip } from '../shared/LightTooltip';
import RecargarDocIcon from './RecargarDocIcon';

type CheckUploadIconComponentProps = {
  onClick: () => void,
  imagen?: string;
}

const CheckUploadIconComponent = ({imagen = CheckDocumento, onClick}:CheckUploadIconComponentProps)  => {
  return (
    <>
      <List
        onClick={() => onClick()}
        // sx={{
        //   ":hover":
        //   {
        //   background:"#BEC400",
        //   borderRadius: "50%",
        //   height: "45px",
        //   width: "45px",
        //   left: 4,
        //   }
        // }}
        >
          <div className="relative h-8 w-8">
            <Image src={imagen}  alt='checkDocumento' />
          </div>
      </List>
    </>
  )
}

export default CheckUploadIconComponent