import React, { useEffect, useState } from 'react';
import { Dialog, Button, DialogContent, DialogActions } from '@mui/material';
type ModalSinDoc = {
    open: boolean
    onClose: () => void
}


export const Modal = ({ open, onClose }: ModalSinDoc) => {


    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <DialogContent>
                    <h5 className='text-center text-[#1D428A] font-bold'>No se encontraron documentos obligatorios configurados con los parametros seleccionados.</h5>
                </DialogContent>
                <DialogActions className='self-center'>
                    <Button
                        disableRipple
                        variant="outlined"
                        className="btnModal"
                        onClick={onClose}>Aceptar</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Modal;