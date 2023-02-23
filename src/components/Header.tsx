import { Box } from '@mui/material'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { modalPara, uiSetError } from '../redux/slices/ui/ui.slice';
import { RootState, useAppDispatch } from '../redux/store';
import styles from './genericos/Genericos.module.css';
interface HeaderProps {
icono?: string;
estilosIcono?: React.CSSProperties;
titulo?: string;
logo?: string;
callBack?: ()=>void;
showClose?: boolean;
estilos?: React.CSSProperties;
}

const Header = ({icono, estilosIcono, titulo, logo, callBack, showClose=true, estilos}: HeaderProps) => {
  const [caducoSession, setCaducoSession] = useState<boolean>(false);
  const { dataError } = useSelector((state: RootState) => state.ui);

    useEffect(() => {
      if(dataError && dataError.codigo === 401){
          setCaducoSession(true);
      }
    }, [dataError])

    const handleClose = () => {
        dispatch(uiSetError(null));
        dispatch(dataErrorReducer(null));
        dispatch(modalPara(null as any));
        if(caducoSession){
            window.location.href='/'
        }
    };

    const dispatch = useAppDispatch();

    const cerrarModal = () => {
        callBack ?
            callBack()
        :
            handleClose()
    }

    const estilosDefault: React.CSSProperties = { marginBottom: 20, display: 'flex', alignItems: 'start', color: 'gray', justifyContent: 'space-between', width: '100%'}
 
  return (
    <>
      <Box style={{height: 70, display: 'flex', justifyContent: 'center', background: '#1D428A', width: '100%'}}>
        <div className="flex flex-wrap justify-center">
          <Image
            src="@/assets/principal-fondo-azul.png"
            className="max-w-sm h-auto transition-shadow ease-in-out duration-300 shadow-none hover:shadow-xl"
            alt=""
          />
        </div>
      </Box> 
    </>
  )
}

export default Header

function dataErrorReducer(arg0: null): any {
  throw new Error('Function not implemented.');
}
