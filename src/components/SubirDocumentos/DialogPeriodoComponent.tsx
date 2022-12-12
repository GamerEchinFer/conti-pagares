import { Button, ListItem, Stack, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import dayjs, { Dayjs } from 'dayjs';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { theme } from '../../../theme/Theme';
import { EtiquetaVariableResponse } from '../../interfaces/interfaces';
import { etiquetaVariableActions } from '../../redux/slices/etiquetaVariable.slice';

type DialogPeriodoComponentProps = {
  item: EtiquetaVariableResponse
}

export default function DialogPeriodoComponent({item}: DialogPeriodoComponentProps) {
  const dispatch = useDispatch()
  const fullScreen = useMediaQuery(theme.breakpoints.down('xl'));  
    

  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs('2022-11-30T21:11:54'),
  );                                                                                               

  const handleClose = () => {
    // setOpen(false);
    dispatch(etiquetaVariableActions.etiquetaVariableCloseAllModals())
  };

  return (
    <>        
      <Dialog
        fullScreen={fullScreen}
        open={!!item.openModalPeriodo}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
       
       <DialogTitle 
            className="flex justify-center"
            style={{color: "#1D428A",
            fontWeight:"400px",
            fontSize:"16px"}}
            sx={{paddingTop: "60px" }}
        >
            Elegir la cantidad de documentos a adjuntar
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
                    // label="Number"
                    className="periodicidad"
                    type="number"
                    size="small"
                    InputLabelProps={{
                    shrink: true,
                    }} 
                />
            </Stack>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <ListItem>
                <div className="">Numero_documento</div>
            </ListItem>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
