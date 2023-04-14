
import TipoBusquedaPage from './tipoBusqueda'
import { NextPage } from 'next';
import { useAppDispatch } from '../redux/store';
import { useMount } from 'ahooks';
import { postAutenticarServicio } from '../api/keycloakApi';
import { keycloakHeaders } from '../constants/constants';
import { getProductosAction } from '../redux/thunks/producto.thunks';
import { getBusquedaAction } from '../redux/thunks/busqueda.thunks';
import { useEffect } from 'react';

interface props {
  resp: string
}

const HomePage: NextPage<props> = () => {
  const dispatch = useAppDispatch();

  useMount(() => {
    postAutenticarServicio(keycloakHeaders).then((value) => {            
      localStorage.setItem("gdi-auth", JSON.stringify(value));
      // console.log("the refresh of token",value.expires_in);      
      // dispatch(getProductosAction())
      dispatch(getBusquedaAction)
    }).finally(() => {}); 
  })
  
  return (
    <>
      <TipoBusquedaPage />
    </>
  )
}

export default HomePage
