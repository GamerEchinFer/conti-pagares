import { Dialog, DialogTitle, useMediaQuery, useTheme } from '@mui/material';
import React from 'react'
import FileUploadIconComponent from './FileUploadIconComponent';

const AdjuntarDocumentoComponent = () => {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

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
            Elegir cantidad de documentos a adjuntar 
            <input type="number" id="inputDoc" value={4} className="pl-2 inputDesign" />
            <input type="number" id="inputDoc" className="border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 p-1"/>
        </DialogTitle>
        </Dialog>
    </>
  )
}

export default AdjuntarDocumentoComponent