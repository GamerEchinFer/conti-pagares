import { useGDIAuth } from '../../hooks/useGDIAuth'

const AuthGDI = (props: any) => {

    useGDIAuth()    

  return props.children
}

export default AuthGDI