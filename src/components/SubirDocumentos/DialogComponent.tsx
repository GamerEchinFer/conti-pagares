import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Checkbox, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ButtonConfirmar from '../Buttons/ButtonConfirmar';
import FileUploadIconComponent from './FileUploadIconComponent';
import ButtonModificar from '../Buttons/ButtonModificar';
import CancelButton from '../Buttons/CancelButton';
import AddDocumentComponent from './AddDocumentComponent';

export default function DialogComponent() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xl'));
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  
  const handleClickOpen = () => {
    setOpen(true); 
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <FileUploadIconComponent onClick={handleClickOpen} />
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          id="responsive-dialog-title"
          className="justify-start"
        >
          Central de Riesgos de Bancard
        </DialogTitle>
        <DialogActions className="flex justify-end">
          <Button autoFocus onClick={handleClose}>X</Button>
        </DialogActions>
          <div className="flex justify-start md:flex-row flex-col max-w-3xl">
            <DialogContent>
              <DialogContentText
                className="pb-4"
              >
                <span className="pr-10">Tamaño:</span><span>Cantidad de Paginas:</span>
              </DialogContentText>
                <div className="pb-4">
                  <TextField
                    label="Fecha de Expedición"
                    value={"22 - Marzo - 2021"}
                    fullWidth
                  />
                </div>                                                              
                <div style={{ border:"1px solid black",borderRadius:"5px", padding:"8px"}}>
                  Cortar desde <input type="number" id="inputID"  /> 
                  Cortar hasta <input type="number" id="inputID"  />
                </div>
                <div>
                    Es un documento autenticado
                    <Checkbox {...label} defaultChecked />
                </div>
                <div className="pb-4 pt-4">
                  <TextField
                    label="Asociar a Operación"
                    value={"74783648247234"}
                    fullWidth
                  />
                </div>
                <AddDocumentComponent />
                <div className="flex flex-row justify-center gap-8 pb-4">
                  <CancelButton onClick={handleClose}/>
                  <ButtonConfirmar onClick={handleClose}/>
                  <ButtonModificar onClick={handleClose}/>
                </div>
              
            </DialogContent>
            <div>
              PDF visor
            </div> 
          </div>
      </Dialog>
    </>
  );
}
