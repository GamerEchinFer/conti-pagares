import { Button, List} from '@mui/material'
import { url } from 'inspector';
import Image from "next/image";
import CheckDocumento from '../../assets/svg/CheckDocumento.svg' 
import RecargarDocumento from '../../assets/svg/RecargarDocumento.svg' 
import { LightTooltip } from '../shared/LightTooltip';
import RecargarDocIcon from './RecargarDocIcon';

type CheckUploadIconComponentProps = {
  onClick: () => void,
  imagen?: string;
  onMouseOver?: () => void;
}

const CheckUploadIconComponent = ({imagen = CheckDocumento, onClick, onMouseOver}:CheckUploadIconComponentProps)  => {
  return (
    <>
      <List
        onMouseOver={onMouseOver}
        onClick={() => onClick()}
        sx={{
          ":hover":
          {
          background:"#BEC400",
          borderRadius: "50%",
          height: "45px",
          width: "45px",
          left: 4,
          bodyBackground: "url(RecargarDocumento.svg)"
          }
        }}
        >
          <div className="relative h-8 w-8">
            <Image src={imagen}  alt='checkDocumento' />
          </div>
      </List>
    </>
  )
}

export default CheckUploadIconComponent