import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack, ListItem, ListItemText, Divider } from '@mui/material';

export default function AddDocumentList() {
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle 
            className="flex justify-center"
            style={{color: "#1D428A",
            fontWeight:"400px",
            fontSize:"16px"}}
            sx={{paddingTop: "60px" }}
            
        >
            Seleccione la cantidad de documentos a adjuntar
            <Stack
                component="form"
                sx={{
                    width: '7ch',
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    id="outlined-number"
                    className="periodicidad"
                    type="number"
                    size="small"
                    value={6}
                    InputLabelProps={{
                    shrink: true,
                    }} 
                />
            </Stack>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <ListItem>
            <ListItemText>
                Nombre_Documento_01
            </ListItemText>
            </ListItem>
              <Divider />
          </DialogContentText>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleClose}>Aceptar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}