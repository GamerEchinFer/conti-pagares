import { Button, ListItem, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { documentosUser, documentosUserActions } from '../../redux/slices/documentosUser.slice';
import { useEffect, useState } from 'react';

type ButtonFiltroProps = {
  onClick: () => void,
  descripcion: string,
  active?: boolean
}

const ButtonFiltro = ({onClick, descripcion, active=false}: ButtonFiltroProps) => {
    const [alignment, setAlignment] = useState('');
    const [isClicked, setIsClicked] = useState(false);

    const handleChange = (
      event: React.MouseEvent<HTMLElement>,
      newAlignment: string,
    ) => {
      setAlignment(newAlignment);
    };

    const dispatch = useDispatch();

    const documentosUser = useSelector((state: RootState) => state.documentosUser.items);        
    

    if (!documentosUser || !documentosUser.filtroGrupo || !Array.isArray(documentosUser.filtroGrupo)) return null
    
      // {JSON.stringify(documentosUser)}
    
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
            onClick={() => onClick ? onClick() : null}
            variant="outlined"
            
            size="small"
            sx={{ background: active ? "#1D428A" : "#ffffff" ,
                  color: active ? "#ffffff": "#1D428A",
                  ":hover":{background:"#1D428A", color:"#ffffff", fontWeight:"200" }}}
            style={{ fontWeight: "200",fontSize: "16px"}}
            className="btnFiltro"
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