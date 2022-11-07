import { ListItem, ListItemText, Divider, ListItemButton } from '@mui/material';
import { EtiquetaVariableResponse } from '../../interfaces/interfaces';
import DialogComponent from './DialogComponent';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

type DocumentListComponentProps = {
  item: EtiquetaVariableResponse
}

const DocumentListComponent  = ({item}: DocumentListComponentProps) => {
  // const etiquetasVariables = useSelector((state: RootState) => state.etiquetaVariable.response);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  
  const handleClickOpen = () => {
    navigate('/dialog-components');
  }

  return (
    <>
      <ListItem component="div" disablePadding>
          <ListItemText
            primary={item.tipoDocumento}
            primaryTypographyProps={{fontSize:"20px", color:"#1D428A", fontWeight:"400"}}
            secondary="Adjunta el documento con el explorador de archivos" 
            secondaryTypographyProps={{fontSize:"12px", color:"#373A3C", fontWeight:"400"}}
            />
          <ListItemButton>
            <DialogComponent />
          </ListItemButton>
      </ListItem>
      <Divider />
    </>
  );
}

export default DocumentListComponent;
