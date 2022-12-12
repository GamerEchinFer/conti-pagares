import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { fontWeight } from '@mui/system';
import { Stack, ListItem } from '@mui/material';
import { useMount } from 'ahooks';
import { postGuardarDocumento } from '../../api/apmDesaApi';
import { GuardarDocumentoRequest } from '../../interfaces/interfaces';



export default function AddDocumentList() {
  const [open, setOpen] = React.useState(true);


  useMount(() => {
    // ctrl + alt + abajo
    /*const body: GuardarDocumentoRequest = {
        codigoTipoDocumento:202,
        rutaDocumento:"C:\\Users\\gonzalo.villalba\\Documents\\GDI",
        fechaRegistro:"2022-10-05T12:56:10.559Z",
        fechaEmision:"01012020",
        descripcionDocumento:"Test",
        codigoCliente:"000666",
        codigoLegajo:99999,
        hadoop:"555",
        hadoopPath:"C:\\Users\\gonzalo.villalba\\Documents\\GDI",
        codigoUsuario:"PER",
        codigoProducto:7,
        codigoSubproducto:151
    }

    postGuardarDocumento(body).then((response) => {console.log(response);
    })*/ 
  })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog open={open} onClose={handleClose}>
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
    </div>
  );
}