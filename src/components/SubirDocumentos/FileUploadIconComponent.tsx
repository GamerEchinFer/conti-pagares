import { List } from '@mui/material'
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
          <div className="relative h-10 w-10">
            <Image src={imagen}  alt='cargaDocumento' className="absolute top-0 right-0 h-8 w-8 cursor-pointer" />
          </div>
      </List>
    </>
  )
}

export default FileUploadIconComponent