import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import Image from "next/image";
import DocPDF from '../../assets/svg/DocPDF.svg' ;
import PdfIconFile from '../../assets/svg/PdfIconFile.svg'; 
import Delete from '../../assets/svg/delete.svg';

import { ListItemIcon } from '@mui/material';
import ButtonDelete from '../Buttons/ButtonDelete';
import { useDispatch } from 'react-redux';

type props = {
  imagen? : string,
  imagen2? : string,
}


const DocPDFIcon = ({imagen = PdfIconFile, imagen2 = Delete}: props) => {
  const dispatch = useDispatch();

  const handleClickDelete = () => {
    // dispatch()
  }

  return (
    <>
    <ListItemIcon
      className="pb-2"
    >
      <Image src={imagen}  alt='docPDF' className="w-10" />
      {/* <ButtonDelete onClick={ handleClickDelete }/> */}
    </ListItemIcon>
    </>
  )
}

export default DocPDFIcon