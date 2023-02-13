import { Box, Dialog, DialogContent, DialogTitle, useMediaQuery } from '@mui/material'
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText/DialogContentText';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { theme } from '../../../theme/Theme';
import { EtiquetaVariableResponse } from '../../interfaces/interfaces';
import BackButton from '../Buttons/BackButton';
import ButtonIconClose from '../Buttons/ButtonIconClose'
import DatosClienteComponent from '../DatosClienteComponent'
import { useEffect } from 'react';
import { etiquetaVariableActions } from '../../redux/slices/etiquetaVariable.slice';
import { RootState } from '../../redux/store';
import { tipoDocumentoHistoricoActions } from '../../redux/slices/documentoHistorico.slice';

export interface DialogProps {
    
}

const ConsultarHistoricoContent = ({}: DialogProps) => {

    const tipoDocumentoHistoricos = useSelector((state: RootState) => state.tipoDocumentoHistorico.items);  

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false); 
    const modalScreend = useMediaQuery(theme.breakpoints.down('md'));

    const handleClose = () => {
        dispatch(tipoDocumentoHistoricoActions.tipoDocumentoHistoricoReset())        
    }

    const handleClickOpen = () => {
        setOpen(true);
    }

    // const handleClose = () => {
    //     setOpen(false);
    // }

  return (
    <>
        <Dialog
            fullScreen={modalScreend}
            open={tipoDocumentoHistoricos.length > 0} // {item?.openModalConsultaDocumentos ?? false}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogActions>
                <ButtonIconClose
                    autoFocus={true}
                    onClick={handleClose}
                />
            </DialogActions>
            <DialogTitle
                id="responsive-dialog-title"
                className="right-4"
            >
                <DatosClienteComponent />
            </DialogTitle>

            <DialogContent>
                <DialogContentText>
                    {JSON.stringify(tipoDocumentoHistoricos)}
                </DialogContentText>
                <div className="flex justify-center">
                    <BackButton onClick={handleClose} />
                </div>
            </DialogContent>
        </Dialog>
    </>
  )
}

export default ConsultarHistoricoContent

