import { Button, Divider, Grid, IconButton, List, ListItem, ListItemText, Stack, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { theme } from '../../../theme/Theme';
import { EtiquetaVariableResponse } from '../../interfaces/interfaces';
import { etiquetaVariableActions } from '../../redux/slices/etiquetaVariable.slice';
import BackButton from '../Buttons/BackButton';
import ButtonCargar from '../Buttons/ButtonCargar';
import ButtonIconClose from '../Buttons/ButtonIconClose';
import FileUploadIconComponent from './FileUploadIconComponent';

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

export default function DialogPeriodoComponent({item}: DialogPeriodoComponentProps) {
  const dispatch = useDispatch();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));                                                                                              
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  const handleClose = () => {
    // setOpen(false);
    dispatch(etiquetaVariableActions.etiquetaVariableCloseAllModals())
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
      >
       <DialogActions>
          <ButtonIconClose autoFocus={true} onClick={handleClose} />
        </DialogActions>
       <DialogTitle 
            className="flex justify-center"
            style={{color: "#1D428A",
            fontWeight:"400px",
            fontSize:"16px"}}
            sx={{paddingTop: "15px" }}
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
                    value={6}
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
                secondaryAction={
                      <FileUploadIconComponent onClick={handleChangeFile} />
                  }
                  >
                  <ListItemText
                    primary="Nombre_Documento_01"
                    secondary={secondary ? 'Secondary text' : null}
                    sx={{fontSize:"12px", color:"#1D428A", fontWeight:"400"}}
                  />
                  <ListItemText
                    primary="Diciembre 2022"
                  />
                </ListItem>
              )}
              <Divider />
            </List>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div className="flex flex-row justify-center gap-4 pb-4 pr-20 ">
            <BackButton onClick={handleClose} />
            <ButtonCargar onClick={handleClose} />
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
}
