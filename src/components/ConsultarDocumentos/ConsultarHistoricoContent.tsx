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
import { getDescargarHadoopDirecto, getDescargarMsFileStream } from '../../api/apmDesaApi';
import { parsePdfBase64 } from '../../helpers/cutPdf';
import PDFComponent from '../SubirDocumentos/PDFComponent';
import ModalHistorico from '../SubirDocumentos/ModalHistorico';
import moment from 'moment';

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
    
        const downloadHadoop = await getDescargarHadoopDirecto(rutaHadoop);
        const downloadApiMsFileStream = await getDescargarMsFileStream(rutaHadoop);
    
        if (!downloadHadoop || !downloadHadoop.data || !downloadHadoop.data.loc) {
          console.log("El downloadHadoop.data.loc no existe: ", downloadHadoop);      
          return;
        }

        if (!downloadApiMsFileStream || !downloadApiMsFileStream.data || !downloadApiMsFileStream.data.datosArchivo) {
          console.log("El downloadApiMsFileStream.data.loc no existe: ", downloadApiMsFileStream);      
          return;
        }
    
        const viewPdfHadoop = `${downloadHadoop?.data?.loc ?? ""}` 
        const viewPdfMsFileStream = `${downloadApiMsFileStream?.data?.datosArchivo ?? ""}` 
    
        return setBase64(parsePdfBase64(viewPdfMsFileStream as string))
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
                                            {row.fechaVerificacion ?? "Sin Certificacion"}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.numeroOperacion ?? "No posee Número Operación"}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.usuarioVerificador ?? "No posee Usuario Verificador"}
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
                                            <span className="pr-10">{datosCliente.clasificacion ?? "No posee clasificación"}</span>
                                            <div className="pr-10 pt-2 pb-2" style={{ color: "#373A3C", fontSize:"16px"}}>Fecha Documento</div>
                                            <span className="pr-10 pb-2">{moment(rowSelected?.fechaEmision).format('DD/MM/YYYY')}</span>
                                            <div className="pr-10 pb-2 pt-2" style={{ color: "#373A3C", fontSize:"16px"}}>Vence {moment(rowSelected?.fechaVencimiento).format('DD/MM/YYYY')}</div>
                                            <div className="pr-10 pb-2 pt-2" style={{ color: "#373A3C", fontSize:"16px"}}>Nro. Cuentas 0</div>
                                            <div className="pr-10 pb-4 pt-2" style={{ color: "#373A3C", fontSize:"16px"}}>Nro. Operación </div>
                                            <div className="pr-10 pb-4">{rowSelected?.numeroOperacion ?? "No existe número operación"}</div>
                                            <div className="pr-10 pb-2 pt-2" style={{ color: "#373A3C", fontSize:"16px"}}>Carga</div>
                                            <span className="pr-10">{rowSelected?.usuarioCarga}  {moment(rowSelected?.fechaEmision).format('DD/MM/YYYY')} </span>
                                            <div className="pr-10 pb-2 pt-2" style={{ color: "#373A3C", fontSize:"16px"}}>Verifica </div>
                                            <span className="pr-10">{rowSelected?.usuarioVerificador} {moment(rowSelected?.fechaVerificacion).format('DD/MM/YYYY')}</span>
                                            <div className="pr-10 pb-2 pt-2" style={{ color: "#373A3C", fontSize:"16px"}}>Certifica</div>
                                            <span className="pr-10">{} {moment(rowSelected?.fechaRegistro).format('DD/MM/YYYY')}</span>
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

