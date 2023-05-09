import React, { useState } from 'react'

import { Dialog, DialogActions, DialogContent, useMediaQuery } from '@mui/material';
import { theme } from '../../../theme/Theme';
import ButtonIconClose from '../Buttons/ButtonIconClose';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Image from 'next/image';
import Check from '../../assets/svg/Check.svg';

type CargaExitosaComponentProps = {
  // success: boolean,
  // imagen: string
  open: boolean,
  onClose: () => void
}

//Solo cuando se guarda el documento
const CargaExitosaComponent = ({open, onClose}: CargaExitosaComponentProps) => {
  const numeroDeLegajo = useSelector((state: RootState) => state.numeroLegajo.items);
  
  const fullScreen = useMediaQuery(theme.breakpoints.down('xl'));
  const [openModal, setOpenModal] = useState(false);

  // Llamar un selector de redux

  // if (loading) {
  //   return null
  // }

  const handleClose = () => {        
    // setOpenModal(false);
    onClose();
  }
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="draggable-dialog-title"
      PaperProps={{ sx: { top: 10, m: 0 , maxWidth: "45%", height: "60%" }}}
      >  
      <DialogActions>
        <ButtonIconClose 
          autoFocus={true}
          onClick={handleClose}
        />
      </DialogActions>
        <DialogContent>
          {/* <div hidden={!props.success}> */}
          <div className="flex justify-center pt-20">
            <Image src={Check} alt="check" />
          </div>
          {
            numeroDeLegajo.map(item => (
              <>
              <div className="text-center pb-5">
                <div style={{color:"#00438A",fontSize:"22px"}} key={item.nextSequence}>Legajo : {item.nextSequence} </div>
                <div style={{color:"#00438A",fontSize:"16px"}} >Documentos cargados de manera exitosa.</div>
              </div>
              </>
            ))
          }
          {/* </div>  */}
        </DialogContent>
    </Dialog>
  )
}

export default CargaExitosaComponent