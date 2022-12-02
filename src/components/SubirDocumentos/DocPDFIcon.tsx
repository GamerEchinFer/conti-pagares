import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import Image from "next/image";
import DocPDF from '../../assets/svg/DocPDF.svg' 

import { ListItemIcon } from '@mui/material';

type props = {
  imagen? : string;
}
const DocPDFIcon = ({imagen = DocPDF}: props) => {
  return (
    <>
    <div className="flex justify-start">
      {/* <ListItemIcon> */}
      <Image src={imagen}  alt='docPDF' />
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

export default DocPDFIcon