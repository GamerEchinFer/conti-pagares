import Head from 'next/head'
import Image from 'next/image'
import { useAppDispatch } from '../redux/store'
import styles from '../styles/Home.module.scss'
import TipoBusquedaPage from './tipoBusqueda'
import { NextPage } from 'next';


interface props {
  resp: string
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
