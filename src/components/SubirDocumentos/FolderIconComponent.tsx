import Image from "next/image";
import Archivo from '../../assets/svg/Archivo.svg' 

type props = {
  imagen? : string;
}
const FolderIconComponent = ({imagen = Archivo}: props) => {
  return (
    <>
    <div className="flex justify-center">
      <Image src={imagen}  alt='archivo' />
    </div>
    </>
  )
}

export default FolderIconComponent