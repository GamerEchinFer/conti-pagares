import { Dialog, DialogTitle, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react';

const AdjuntarDocumentoComponent = () => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [periodicidad, setPeriodicidad] = useState();

    const handleClickOpen = () => {
      setOpen(true); 
    };
    
    const handleClose = () => {
      setOpen(false);
    };

    const handleVolver = () => {

    }

    const handleContinuar = () => {
      
    }

  return (
    <>
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
          Falta(N) adjuntar N documento(S) 
          ¿ Continuar sin cargar ?
          <button onClick={handleVolver}>Volver</button>
          <button onClick={handleContinuar}>Continuar</button>
        </DialogTitle>
      </Dialog>
    </>
  )
}

export default AdjuntarDocumentoComponent