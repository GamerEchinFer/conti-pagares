import TipoBusquedaPage from './tipoBusqueda'
import { NextPage } from 'next';
import { useAppDispatch } from '../redux/store';

interface props {
  resp: string,
}

const HomePage: NextPage<props> = () => {
  const dispatch = useAppDispatch();
  return (
    <>
      <TipoBusquedaPage />
    </>
  )
}

export default HomePage
