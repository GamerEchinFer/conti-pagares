import * as React from 'react';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Checkbox, SelectChangeEvent, TextField } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import ButtonConfirmar from '../Buttons/ButtonConfirmar';
import FileUploadIconComponent from './FileUploadIconComponent';
import CancelButton from '../Buttons/CancelButton';
import { EtiquetaVariableResponse } from '../../interfaces/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { etiquetaVariableActions } from '../../redux/slices/etiquetaVariable.slice';
import { RootState } from '../../redux/store';
import ButtonIconClose from '../Buttons/ButtonIconClose';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { theme } from '../../../theme/Theme';
import AddPDFComponent from './AddPDFComponent';
import { useRef, useState } from 'react';

type DialogComponentProps = {
  item: EtiquetaVariableResponse
}

export default function DialogComponent({item}: DialogComponentProps) {
  const dispatch = useDispatch()
  const fullScreen = useMediaQuery(theme.breakpoints.down('xl'));
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const open = useSelector((state: RootState) => state.etiquetaVariable.openModal)
  
  const [archives, setArchives] = useState(null);
  const inputRef = useRef<any>();

  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs('2022-11-30T21:11:54'),
  );                                                                                             

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };

  const handleDragOver = (event:any) => {
    
  }

  const handleDrop = (event:any) => {
    event.preventDefault();
    console.log(Array.from(event.dataTransfer.files));
    setArchives(event.dataTransfer.archives);
  };

  // debe recibir el parametro drag and drop
  const handleClickOpen = () => {
    // dispatch(etiquetaVariableActions.setOpenModal(true))
  };

  const handleClose = () => {
    // setOpen(false);
    dispatch(etiquetaVariableActions.etiquetaVariableCloseAllModals())
  };

  return (
    <>
    {
      !archives && (
        <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}>
          <input
            type="file"
            multiple
            hidden
            ref={inputRef}></input>
        </div>
      )
    }
      <FileUploadIconComponent onClick={() => inputRef.current.click()} />
      <Dialog
        fullScreen={fullScreen}
        open={!!item.openModal}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
       
        <DialogActions>
          <ButtonIconClose autoFocus={true} onClick={handleClose} />
        </DialogActions>
        <DialogTitle
          id="responsive-dialog-title"
          className="right-4"
        >
          {item.tipoDocumento}
        </DialogTitle>
          <div className="max-w-6xl grid grid-cols-2">
            <DialogContent>
              <DialogContentText
                className="pb-4 "
              >
                <span className="pr-10">Tamaño:</span><span>Cantidad de Paginas:</span>
              </DialogContentText>
                <div className="pb-4">
                <LocalizationProvider dateAdapter={AdapterDayjs}>

                  <DesktopDatePicker
                    label="Fecha de Expedición"
                    inputFormat="DD/MM/YYYY"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                  {/* <TextField
                    label="Fecha de Expedición"
                    value={"22 - Marzo - 2021"}
                    fullWidth
                  /> */}
                </div>                                                              
                <div style={{ border:"1px solid #B7B7B7",borderRadius:"5px", padding:"12px"}}>
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
                    // value={"74783648247234"}
                    placeholder="74783648247234"
                    fullWidth
                  />
                </div>
                
                <div className="flex flex-row justify-center gap-8 pb-4">
                  <CancelButton onClick={handleClose}/>
                  <ButtonConfirmar onClick={handleClose}/>
                  {/* <ButtonModificar onClick={handleClose}/> */}
                </div>
            </DialogContent>
            <div className="max-w-10xl grid grid-cols">
            <DialogContent>
              <AddPDFComponent base64={item?.base64 ?? ""}  />
            </DialogContent>   
          </div>
          </div>
      </Dialog>
    </>
  );
}
