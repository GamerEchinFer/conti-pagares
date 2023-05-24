import Image from 'next/image';
import Documento from '../../assets/svg/Documento.svg';

type props = {
  imagen? : string;
}

const DescriptionIconComponent = ({imagen = Documento}: props) => {
  return (
    <>
      <div className="flex justify-start">
        <Image src={imagen}  alt='documento' />
      </div>
    </>
  )
}

export default DescriptionIconComponent