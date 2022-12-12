import { ListItem, ListItemText, Divider, ListItemButton, Typography } from '@mui/material';
import DialogComponent from './DialogComponent';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { EtiquetaVariableResponse } from '../../interfaces/interfaces';
import { capitalize } from '../../helpers/capitalize';
import { fontWeight } from '@mui/system';
import AddDocumentList from '../../pages/addDocumentList';
import DialogPeriodoComponent from './DialogPeriodoComponent';

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
      <ListItem component="div" disablePadding className="pb-2 pt-2 flex justify-start">
          <ListItemText
            className="pr-2"
            primary={capitalize(`${item.tipoDocumento}`)}            
            primaryTypographyProps={{fontSize:"20px", color: item.tieneDocumento ? "#BEC400" : "#1D428A", fontWeight:"400"}}
            secondary={
              !item.tieneDocumento ?
              <>
                <Typography
                  sx={{fontSize:"12px", color:"#373A3C", fontWeight:"400"}}>
                    Adjunta el documento con el explorador de archivos
                </Typography>
                <span style={{fontSize:"16px", color:"#1D428A", fontWeight:"400" }}>
                  <div className="pt-2">
                  Subir desde el histórico
                  </div>
                </span>
              </> : null}
            />            
          <ListItemButton>
            <DialogComponent item={item} />            
            <DialogPeriodoComponent item={item} />            
          </ListItemButton>
      </ListItem>
      <Divider />
    </>
  );
}

export default DocumentListComponent;