import { List, ListItemIcon } from '@mui/material'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DialogComponent from './DialogComponent';
import Image from "next/image";
import CargaDocumento from '../../assets/svg/CargaDocumento.svg' 

type FileUploadIconComponenteProps = {
  onClick: () => void,
  imagen?: string;
}

const FileUploadIconComponent = ({imagen = CargaDocumento,onClick}:FileUploadIconComponenteProps)  => {
  return (
    <>
      <List
        onClick={() => onClick()}
        >
        <Image src={imagen}  alt='cargaDocumento' />
          {/* <FileUploadIcon 
            sx={{ fontSize: 30,
            left: "10px",
            pl: 0, 
            color: "#1D428A"
            }}
            />    */}
      </List>
    </>
  )
}

export default FileUploadIconComponent