import Image from "next/image";
import PdfIconFile from '../../assets/svg/PdfIconFile.svg'; 
import Delete from '../../assets/svg/delete.svg';
import { ListItemIcon } from '@mui/material';

type props = {
  imagen? : string,
  imagen2? : string,
}


const DocPDFIcon = ({imagen = PdfIconFile, imagen2 = Delete}: props) => {
  return (
    <>
    <ListItemIcon
      className="pb-2"
    >
      <Image src={imagen}  alt='docPDF' className="w-10" />
    </ListItemIcon>
    </>
  )
}

export default DocPDFIcon