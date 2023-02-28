import { Button, Divider, Grid, IconButton, List, ListItem, ListItemText, Stack, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { theme } from '../../../theme/Theme';
import { EtiquetaVariableResponse } from '../../interfaces/interfaces';
import { etiquetaVariableActions } from '../../redux/slices/etiquetaVariable.slice';
import BackButton from '../Buttons/BackButton';
import ButtonCargar from '../Buttons/ButtonCargar';
import ButtonIconClose from '../Buttons/ButtonIconClose';
import FileUploadIconComponent from './FileUploadIconComponent';
import RecargarDocIcon from './RecargarDocIcon';

type DialogPeriodoComponentProps = {
  item: EtiquetaVariableResponse
}


function generate(element: React.ReactElement) {
  return [0, 1, 2, 3, 4 , 5, 6].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

const buttonStyle = (item: EtiquetaVariableResponse) =>  ({
  fontSize:"20px", color: item.tieneDocumento ? "#BEC400" : "#1D428A", fontWeight:"400"
})

export default function DialogPeriodoComponent({item}: DialogPeriodoComponentProps) {
  const dispatch = useDispatch();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xl'));                                                                                              
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const mes = new Date();
  let mesActual = mes.getMonth();

  const month = [
    {
      idMonth: 0,
      nameMonth: "Enero"
    },
    {
      idMonth: 1,
      nameMonth: "Febrero"
    },
    {
      idMonth: 2,
      nameMonth: "Marzo"
    },
    {
      idMonth: 3,
      nameMonth: "Abril",
    },
    {
      idMonth: 4,
      nameMonth: "Mayo"
    },
    {
      idMonth: 5,
      nameMonth:"Junio"
    },
    {
      idMonth: 6,
      nameMonth:"Julio"
    },
    {
      idMonth: 7,
      nameMonth:"Agosto"
    },
    {
      idMonth: 8,
      nameMonth:"Septiembre"
    },
    {
      idMonth: 9,
      nameMonth:"Octubre"
    },
    {
      idMonth: 10,
      nameMonth:"Noviembre"
    },
    {
      idMonth: 11,
      nameMonth:"Diciembre"
    },
  ];

  const [inputValor, setInputValor] = useState();
  const inputRef = useRef<any>();

  const handleClose = () => {
    // setOpen(false);
    dispatch(etiquetaVariableActions.etiquetaVariableCloseAllModals());
  };

  const handleChangeFile = () => {

  }

  return (
    <>        
      <Dialog
        fullScreen={fullScreen}
        open={!!item.openModalPeriodo}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{ sx: { top: 10, m: 0 , maxWidth: "40%", height: "80%" }}}
      >
       <DialogActions>
          <ButtonIconClose autoFocus={true} onClick={handleClose} />
        </DialogActions>
       <DialogTitle 
          className="flex justify-center"
          style={{color: "#1D428A", fontWeight:"400px", fontSize:"16px"}}
          sx={{paddingTop: "15px" }}
        >
            Elegir la cantidad de documentos a adjuntar
          <Stack
            component="form"
            sx={{ width: '7ch' }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-number"
              // label="Number"
              className="periodicidad"
              type="number"
              size="small"
              value={6} // valor >=6 a generar de lista de elementos
              InputLabelProps={{
              shrink: true,
              }} 
            />
          </Stack>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid item xs={12} md={6}>
              <List dense={dense}>
                {generate(
                  
                  <ListItem
                    component="div"
                    disablePadding
                    secondaryAction={
                      item.tieneDocumento 
                        ? <RecargarDocIcon onClick={() => inputRef.current.click()}  />                        
                        : <FileUploadIconComponent onClick={() => inputRef.current.click()} />
                    }
                    >
                    <ListItemText
                      primary={"Nombre_Documento_01"}
                      secondary={secondary ? 'Secondary text' : null}
                      sx={{fontSize:"12px", color:"#1D428A", fontWeight:"400"}}
                    />
                    
                    <ListItemText
                      primary={mesActual}
                    />
                  </ListItem>
                )}
                {/* <Divider /> */}
              </List>
            </Grid>
          </DialogContentText>
        </DialogContent>
          <div className="flex justify-center gap-4 pb-16">
            <BackButton onClick={handleClose} />
            <ButtonCargar onClick={handleClose} />
          </div>
      </Dialog>
    </>
  );
}
