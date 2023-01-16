
import TipoBusquedaPage from './tipoBusqueda'
import { NextPage } from 'next';
import { useAppDispatch } from '../redux/store';
import { useMount } from 'ahooks';
import { postAutenticarServicio } from '../api/keycloakApi';
import { keycloakHeaders } from '../constants/constants';
import { getProductosAction } from '../redux/thunks/producto.thunks';
import { useEffect } from 'react';
import { getIpGeolocation } from '../actions/Auth.actions';
import InicioComponent from '../components/Inicio/InicioComponent';
import { getTipoBusqueda } from '../api/apmDesaApi';

interface props {
  resp: string
}

const HomePage: NextPage<props> = () => {
    useMount(() => {
        postAutenticarServicio(keycloakHeaders).then((value) => {            
            localStorage.setItem("gdi-auth", JSON.stringify(value));
            console.log(value);      
            dispatch(getProductosAction())
        }).finally(() => {
        
          })
        })
        
const dispatch = useAppDispatch();

  return (
    <>
      <TipoBusquedaPage />
      {/* <InicioComponent />  */}
    </>
  )
}

export default HomePage
