import { List} from '@mui/material'
import Image from "next/image";
import CheckDocumento from '../../assets/svg/CheckDocumento.svg' 
import RecargarDocumento from '../../assets/svg/RecargarDocumento.svg' 

type CheckUploadIconComponentProps = {
  onClick: () => void,
  imagen?: string;
  imagenDoc?: string;
}

const CheckUploadIconComponent = ({imagen = CheckDocumento, onClick}:CheckUploadIconComponentProps)  => {
  return (
    <>
      <List
        onClick={() => onClick()}
        // sx={{
        //   ":hover":
        // }}
        >
          <div className="relative h-8 w-8">
            <Image src={imagen}  alt='checkDocumento' />
          </div> 
{/*           
          <div className="relative h-8 w-8">
            <Image src={imagenDoc}  alt='imagenDoc' />
          </div>  */}
      </List>
    </>
  )
}

export default CheckUploadIconComponent