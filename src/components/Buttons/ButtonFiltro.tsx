import { Button, ListItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { documentosUser, documentosUserActions } from '../../redux/slices/documentosUser.slice';
import { useEffect } from 'react';

type ButtonFiltroProps = {
  onClick: () => void,
  descripcion: string
}

const ButtonFiltro = ({onClick, descripcion}: ButtonFiltroProps) => {

    const dispatch = useDispatch()

    const documentosUser = useSelector((state: RootState) => state.documentosUser.items);        
    

    if (!documentosUser || !documentosUser.filtroGrupo || !Array.isArray(documentosUser.filtroGrupo)) return null
    
    console.log(documentosUser);
    
  return (
    <>
      <div className="pt-8">
        <ListItem>
        <Button
          style={{
            // color: "#ffffff",
            fontWeight: "200",
            fontSize: "16px"
            }}
          variant="outlined"
          size="small"
          sx={{
            ":hover":{background:"#1D428A", color:"#ffffff", fontWeight:"200" }}}
          className="btnFiltro"
          onClick={() => onClick()}
        >
        {
          descripcion
        }
        {/* {
          documentosUser.filtroGrupo[0].filtroSubgrupo[0].subgrupoDescripcion
        }

        {
          documentosUser.coleccionDocumento[0].datosAdicionales.descripcion
        }
        {
          documentosUser.coleccionDocumento.map(item => <span 
            key={item.datosAdicionales.idDocumento}>{item.datosAdicionales.descripcion}
            </span>)
        } */}
        </Button>
        </ListItem>
      </div>
    </>
  )
}
export default ButtonFiltro