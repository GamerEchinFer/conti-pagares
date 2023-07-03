import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography, styled } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import abi from '../../assets/img/errorBar/abi-007.svg';
import ButtonAceptar from '../../components/Buttons/ButtonAceptar';

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <>
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    </>
  );
}

const InicioComponent = () => {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        PaperProps={{
          style: { borderRadius: 25 }
        }}
      >
        <DialogContent>
          <Typography gutterBottom>
            <div className="flex justify-center">
              <Image src={abi} alt="abi-007" />
            </div>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          <div className="flex justify-center">        
            <span style={{color: "#1D428A", fontSize:"30px", paddingBottom: "8px"}}>Carpeta Digital</span>
          </div>
        </BootstrapDialogTitle>
            <div className="text-center pt-2">
              <div style={{fontSize:"25px"}}>Ups! Sin acceso...</div>
              <div style={{fontSize:"18px"}}>Tu perfil no cuenta con esta pantalla habilitada actualmente, </div>
              <span style={{fontSize:"18px"}}>cargá un ticket en servicedesk solicitando el acceso del mismo al departamento de seguridad.</span>
            </div>
          </Typography>
        </DialogContent>
        <DialogActions>
          <ButtonAceptar autoFocus onClick={handleClose} />
        </DialogActions>
      </Dialog>
    </div>
    </>
  )
}

export default InicioComponent