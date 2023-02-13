import { Button, ListItem, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { documentosUser, documentosUserActions } from '../../redux/slices/documentosUser.slice';
import { useEffect, useState } from 'react';

type ButtonFiltroProps = {
  onClick: () => void,
  descripcion: string
}

const ButtonFiltro = ({onClick, descripcion}: ButtonFiltroProps) => {
    const [alignment, setAlignment] = useState('');

    const handleChange = (
      event: React.MouseEvent<HTMLElement>,
      newAlignment: string,
    ) => {
      setAlignment(newAlignment);
    };

    const dispatch = useDispatch();

    const documentosUser = useSelector((state: RootState) => state.documentosUser.items);        
    

    if (!documentosUser || !documentosUser.filtroGrupo || !Array.isArray(documentosUser.filtroGrupo)) return null
    
    console.log(documentosUser);
    
  return (
    <>
      <div className="pt-8">
        <ListItem>
          {/* <ToggleButtonGroup
           value={alignment}
           exclusive
           onChange={handleChange}
           aria-label="Platform"
          > */}
          {/* <ToggleButton value={descripcion}> */}
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
          </Button>
          {/* </ToggleButton>
          </ToggleButtonGroup> */}
        </ListItem>
      </div>
    </>
  )
}
export default ButtonFiltro