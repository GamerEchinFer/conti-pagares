import { Dialog, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useMediaQuery } from '@mui/material'
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText/DialogContentText';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { theme } from '../../../theme/Theme';
import BackButton from '../Buttons/BackButton';
import ButtonIconClose from '../Buttons/ButtonIconClose'
import DatosClienteComponent from '../DatosClienteComponent'
import { RootState } from '../../redux/store';
import { tipoDocumentoHistoricoActions } from '../../redux/slices/documentoHistorico.slice';
import { capitalize } from '../../helpers/capitalize';
import SearchIcon from '@mui/icons-material/Search';

const ConsultarHistoricoContent = () => {

    const tipoDocumentoHistorico = useSelector((state: RootState) => state.tipoDocumentoHistorico.items);  

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false); 
    const modalScreend = useMediaQuery(theme.breakpoints.down('xl'));
    
    const handleClose = () => {
        dispatch(tipoDocumentoHistoricoActions.tipoDocumentoHistoricoReset())        
    }

    const handleClickOpen = () => {
        setOpen(true);
    }

  return (
    <>  
        <Dialog
            fullScreen={modalScreend}
            open={tipoDocumentoHistorico.length > 0}
            // open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
            
            sx={{
                "& .MuiDialog-container": {
                    justifyContent: "flex-center",
                    alignItems: "flex-center",
                    backgroundColor:"white"
                }
            }}
            PaperProps={{ sx: { top: 10, m: 0 , minWidth: "80%", height: "80%" }}}
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
                    {/* {JSON.stringify(tipoDocumentoHistoricos)} */}
                    <TableContainer>
                        <Table style={{}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className="tablaHistorico">Nombre de documento</TableCell>
                                    <TableCell className="tablaHistorico">Fecha certificacion</TableCell>
                                    <TableCell className="tablaHistorico">Nro. de operación</TableCell>
                                    <TableCell className="tablaHistorico">Autorizador</TableCell>
                                    <TableCell className="tablaHistorico">Ver</TableCell>  
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tipoDocumentoHistorico.map((row) => 
                                    <TableRow key={row.descripcion}>
                                        <TableCell component="th" scope="row">
                                            {capitalize(`${row.descripcion}`)}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.fechaVerificacion} Sin Certificacion
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.numeroOperacion}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.usuarioVerificador} Sin elementos
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {/* {row.codigoTipoDocumento} */}
                                            <SearchIcon style={{ color:"#B2B2B2"}} className="p-1" />
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
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

