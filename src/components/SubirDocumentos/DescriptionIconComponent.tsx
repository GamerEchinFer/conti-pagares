import Image from 'next/image';
import Documento from '../../assets/svg/Documento.svg';

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