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
import { capitalize, capitalizePorPalabra } from '../../helpers/capitalize';
import { TipoDocumentoHistoricoResponse } from '../../interfaces/interfaces';
import { getDescargarHadoopDirecto } from '../../api/apmDesaApi';
import { parsePdfBase64 } from '../../helpers/cutPdf';
import PDFComponent from '../SubirDocumentos/PDFComponent';
import ModalHistorico from '../SubirDocumentos/ModalHistorico';

const ConsultarHistoricoContent = () => {

    const tipoDocumentoHistorico = useSelector((state: RootState) => state.tipoDocumentoHistorico.items);  
    
    const dispatch = useDispatch();
    const modalScreend = useMediaQuery(theme.breakpoints.down('xl'));
    const [base64, setBase64] = useState("");
    const [rowSelected, setRowSelected] = useState<TipoDocumentoHistoricoResponse | undefined>(undefined)  
    const datosCliente = useSelector((state: RootState) => state.clienteDatos.items);
    const fullScreen = useMediaQuery(theme.breakpoints.down('xl'));
    const [openModalHistorico, setOpenModalHistorico] = useState(false);

    const handleClose = () => {
        dispatch(tipoDocumentoHistoricoActions.tipoDocumentoHistoricoReset())
    }

    const handleClickModal = () => {
        setOpenModalHistorico(true);
    }

    const closeModal = () => {
        setOpenModalHistorico(false);
    }

    const handleClickHistorico = async (row: TipoDocumentoHistoricoResponse) => {        
        setRowSelected(row)
        setOpenModalHistorico(true);

        const rutaHadoop = row.rutaHadoop;
    
        const download = await getDescargarHadoopDirecto(rutaHadoop);
    
        if (!download || !download.data || !download.data.loc) {
          // Alerta
          console.log("El download.data.loc no existe: ", download);      
          return;
        }
    
        const viewPdf = `${download?.data?.loc ?? ""}` 
    
        return setBase64(parsePdfBase64(viewPdf as string))
    }
  return (
    <>  
        <Dialog
            fullScreen={modalScreend}
            open={tipoDocumentoHistorico.length > 0}
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
                    <TableContainer>
                        <Table aria-label="simple table">
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
                                {Array.isArray(tipoDocumentoHistorico)
                                ?
                                tipoDocumentoHistorico.map((row) => 
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
                                            <ModalHistorico onClick={handleClickModal} />
                                        </TableCell>
                                    </TableRow>
                                ) : null }

                                <Dialog
                                    fullScreen={fullScreen}
                                    open={openModalHistorico}
                                    onClose={closeModal}
                                    aria-labelledby="draggable-dialog-title"
                                    PaperProps={{ sx: { top: 10, m: 0 , maxWidth: "90%", height: "90%" }}}
                                >
                                <DialogActions>
                                    <ButtonIconClose 
                                    autoFocus={true}
                                    onClick={closeModal}
                                    />
                                </DialogActions>
                                <div className="max-w-6xl grid grid-cols-2 gap-10">
                                    <DialogContent>
                                        <DialogContentText className="pb-4">
                                            <div className="pr-10" style={{ color: "#373A3C", fontSize:"16px"}}>Código de Cliente 
                                                <span style={{color:"#818A91", fontSize:"16px"}}> {datosCliente.codigoCliente}</span></div>
                                            <div className="pr-10">
                                            {(datosCliente.primerNombre ? `${capitalizePorPalabra(`${datosCliente?.primerNombre ?? ''}`)} ${capitalizePorPalabra(`${datosCliente?.segundoNombre ?? ''}`)} ${datosCliente?.primerApellido ?? ''} ${datosCliente?.segundoApellido ?? ''}` : '')}
                                            </div>
                                            <div className="pr-10  pt-2" style={{ color: "#373A3C", fontSize:"16px"}}>Clasificación</div>
                                                {rowSelected?.rutaHadoop}
                                            <span className="pr-10">Documento General</span>
                                            <div className="pr-10 pt-2 pb-2" style={{ color: "#373A3C", fontSize:"16px"}}>Fecha Documento</div>
                                            <span className="pr-10 pb-2"></span>
                                            <div className="pr-10 pb-2 pt-2" style={{ color: "#373A3C", fontSize:"16px"}}>Vence 30/03/2023</div>
                                            <div className="pr-10 pb-2 pt-2" style={{ color: "#373A3C", fontSize:"16px"}}>Nro. Cuentas 0</div>
                                            <div className="pr-10 pb-4 pt-2" style={{ color: "#373A3C", fontSize:"16px"}}>Nro. Operación </div>
                                            <div className="pr-10 pb-4">3453563677 </div>
                                            <div className="pr-10 pb-2 pt-2" style={{ color: "#373A3C", fontSize:"16px"}}>Carga </div>
                                            <span className="pr-10">Juan Perez   28/03/2023 </span>
                                            <div className="pr-10 pb-2 pt-2" style={{ color: "#373A3C", fontSize:"16px"}}>Verifica </div>
                                            <span className="pr-10">Juan Perez   28/03/2023 </span>
                                            <div className="pr-10 pb-2 pt-2" style={{ color: "#373A3C", fontSize:"16px"}}>Certifica</div>
                                            <span className="pr-10">Juan Perez   28/03/2023 </span>
                                        </DialogContentText>
                                        <div className="flex flex-row justify-center pb-4">
                                            <BackButton onClick={closeModal}/>
                                        </div>
                                    </DialogContent>
                                    <div className="max-w-10xl grid grid-cols" style={{width:"160%"}}>
                                        <DialogContent>
                                            <PDFComponent base64={base64 ?? ""} /> 
                                        </DialogContent>  
                                    </div>
                                </div>
                                </Dialog>
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

