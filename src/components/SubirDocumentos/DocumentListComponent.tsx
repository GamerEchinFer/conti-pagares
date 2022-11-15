import { ListItem, ListItemText, Divider, ListItemButton } from '@mui/material';
import DialogComponent from './DialogComponent';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { EtiquetaVariableResponse } from '../../interfaces/interfaces';

type DocumentListComponentProps = {
  item: EtiquetaVariableResponse
}

const DocumentListComponent  = ({item}: DocumentListComponentProps) => {
  // const etiquetasVariables = useSelector((state: RootState) => state.etiquetaVariable.response);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  
  const handleClickOpen = () => {
    router.push('/dialog-components');
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
