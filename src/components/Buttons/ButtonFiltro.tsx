import { Button, ListItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useState } from 'react';

type ButtonFiltroProps = {
  onClick: () => void,
  descripcion: string,
  active?: boolean
}

const ButtonFiltro = ({onClick, descripcion, active=false}: ButtonFiltroProps) => {
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
    
    
  return (
    <>
      <div className="">
        <div className='w-100 p-1'>
          <Button
            onClick={() => onClick ? onClick() : null}
            variant="outlined"

            size="small"
            sx={{ background: active ? "#1D428A" : "#ffffff" ,
                  color: active ? "#ffffff": "#1D428A",
                  ":hover":{background:"#1D428A", color:"#ffffff", fontWeight:"200" }}}
            className="btnFiltro"
          >
          {
            descripcion
          }
          </Button>
        </div>
      </div>
    </>
  )
}
export default ButtonFiltro