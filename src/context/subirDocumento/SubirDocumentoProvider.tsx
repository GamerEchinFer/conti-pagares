import {PropsWithChildren} from 'react'
import { SubirDocumentoContext } from './SubirDocumentoContext'


export const SubirDocumentoProvider = ({children}: PropsWithChildren) => {
    return (
        <SubirDocumentoContext.Provider value={{}}>
            {children}
        </SubirDocumentoContext.Provider>
    )
}