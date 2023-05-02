
import TipoBusquedaPage from './tipoBusqueda'
import { NextPage } from 'next';
import { useAppDispatch } from '../redux/store';

interface props {
  resp: string,
}
const expires_in = 300

const HomePage: NextPage<props> = () => {
  const dispatch = useAppDispatch();

  // useEffect(() => {

  //   postAutenticarServicio(keycloakHeaders).then((value) => {  
  //     const miliseconds = new Date().getTime()
  //     localStorage.setItem("gdi-auth-date", miliseconds.toString())          
  //     localStorage.setItem("gdi-auth", JSON.stringify(value));
  //   })

  //   const interval = setInterval(() => {
  //     const date = localStorage.getItem("gdi-auth-date")  
  //     if (!date) { return; }

  //     const milisecond = Number(date) + (1000 * expires_in)
  //     const actual = new Date().getTime()

  //     if (actual >= milisecond) {
  //       postAutenticarServicio(keycloakHeaders).then((value) => {  
  //         const miliseconds = new Date().getTime()
  //         localStorage.setItem("gdi-auth-date", miliseconds.toString())          
  //         localStorage.setItem("gdi-auth", JSON.stringify(value));
  //         // window.location.reload()
  //       })
  //     }      
  //   }, 1000 * expires_in)    
    
    
  //   return () => {
  //     clearInterval(interval)
  //   }


  // }, [])
  
  return (
    <>
      <TipoBusquedaPage />
    </>
  )
}

export default HomePage
