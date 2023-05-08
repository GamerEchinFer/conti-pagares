import { ColeccionDocumento, DocumentosUsuarioResponse } from '../../interfaces/interfaces';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TableCell, TableRow, useMediaQuery } from '@mui/material';
import { capitalize, capitalizePorPalabra } from '../../helpers/capitalize';
import CertificadoIcon from '../shared/CertificadoIcon';
import PendienteIcon from '../shared/PendienteIcon';
import RechazadoIcon from '../shared/Rechazado';
import VencidoIcon from '../shared/VencidoIcon';
import VerificadoIcon from '../shared/VerificadoIcon'; 
import { useDispatch, useSelector } from 'react-redux';
import ConsultarHistoricoContent from './ConsultarHistoricoContent';
import { getTipoDocumentoHistoricoAction } from '../../redux/thunks/documentoHistorico.thunks';
import { RootState } from '../../redux/store';
import { useState } from 'react';
import ViewPDFComponent from '../SubirDocumentos/ViewPDFComponent';
import ButtonIconClose from '../Buttons/ButtonIconClose';
import BackButton from '../Buttons/BackButton';
import { theme } from '../../../theme/Theme';

type DocumentoUserTableRowProps = {
  row: ColeccionDocumento,
  handleClickViewDoc?: () => void,
  onClickRow: () => void
}


const DocumentoUserTableRow = ({row, handleClickViewDoc, onClickRow}: DocumentoUserTableRowProps) => {

  const datosCliente = useSelector((state: RootState) => state.clienteDatos.items);

  const documentosUser = useSelector((state: RootState) => state.documentosUser.items);        
  
  const fullScreen = useMediaQuery(theme.breakpoints.down('xl'));

  const dispatch = useDispatch();
  
  const [open, setOpen] = useState(false);

  const openTipoDocHistorico = () => {        
    dispatch(getTipoDocumentoHistoricoAction(datosCliente.codigoCliente, row.datosAdicionales.codigoTipoDocumento))   
  }

  const openConsultaDocPDF = () => {        
    // dispatch(getDocumentosUserAction(datosCliente.codigoCliente, row.filtroDocumento));
    setOpen(true);
  }
  const handleClose = () => {        
    setOpen(false);
  }

  return (
    <>
      <TableRow
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        key={row.datosAdicionales.idDocumento}
      >
      <TableCell 
        align="left"
        style={{
          fontWeight: "200",
          fontSize:"16px",                  
          paddingLeft: 0
        }}
      >
        <button onClick={onClickRow}>
          <div className="flex justify-start">
            <SearchIcon style={{ color:"#B2B2B2"}} className="p-1" />
            {(capitalize(`${row.datosAdicionales.descripcion}`))}                    
          </div>
        </button>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="draggable-dialog-title"
          PaperProps={{ sx: { top: 10, m: 0 , maxWidth: "80%", height: "90%" }}}
        >
          <DialogActions>
            <ButtonIconClose 
              autoFocus={true}
              onClick={handleClose}
            />
          </DialogActions>
          <div className="max-w-6xl grid grid-cols-2 gap-10">
            <DialogContent>
                <DialogContentText
                    className="pb-4">
                      {row.datosAdicionales.rutaHadoop}
                    <div className="pr-10" style={{ color: "#373A3C", fontSize:"16px"}}>Código de Cliente 
                        <span style={{color:"#818A91", fontSize:"16px"}}> {datosCliente.codigoCliente}</span></div>
                    <div className="pr-10">
                    {(datosCliente.primerNombre ? `${capitalizePorPalabra(`${datosCliente?.primerNombre ?? ''}`)} ${capitalizePorPalabra(`${datosCliente?.segundoNombre ?? ''}`)} ${datosCliente?.primerApellido ?? ''} ${datosCliente?.segundoApellido ?? ''}` : '')}
                    </div>
                    <div className="pr-10  pt-2" style={{ color: "#373A3C", fontSize:"16px"}}>Clasificación</div>
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
                    {/* <BackButton onClick={embedPdfPages}/> */}
                    <BackButton onClick={handleClose}/>
                </div>
            </DialogContent>
            <div className="max-w-10xl grid grid-cols" style={{width:"160%"}} >
            <DialogContent>
                <div>
                    <object
                        data='https://pdfjs-express.s3-us-west-2.amazonaws.com/docs/choosing-a-pdf-viewer.pdf'
                        type="application/pdf"
                        width="600"
                        height="550"
                    >

                        <iframe
                        src='https://pdfjs-express.s3-us-west-2.amazonaws.com/docs/choosing-a-pdf-viewer.pdf'
                        width="600"
                        height="550"
                        />
                    </object>
                </div>
            </DialogContent>   
            </div>
        </div>  
        </Dialog>
      </TableCell>
      
      <TableCell
        style={{
          color:"#1D428A",
          fontWeight: "200",
          fontSize:"16px"
        }}
      >
        <button className="flex justify-center" onClick={() => openTipoDocHistorico()}>
          Consultar Histórico
        </button>
    </TableCell>

      <TableCell sx={{cursor: 'default'}}>
        {/* {(capitalize(`${row.datosAdicionales.codigoEstadoDocumento}`))} */}
        <div className="flex justify-start">
          {(() => {
            switch(capitalize(`${row.datosAdicionales.codigoEstadoDocumento}`)) {
              case 'Pendiente':
                return <span>Pendiente</span>
              case 'Certificado':
                return <span>Certificado</span>
              case 'Rechazado':
                return <span>Rechazado</span>
              case 'Verificado':
                return <span>Verificado</span>
              case 'Vencido':
                return <span>Vencido</span>
              default:
                return null
            }
          })()}
        </div>
      </TableCell>

      <TableCell
        align="left"
      >
        <div className="flex justify-start pr-2">
          {(() => {
            switch(capitalize(`${row.datosAdicionales.codigoEstadoDocumento}`)) {
              case 'Pendiente':
                return <PendienteIcon />
              case 'Certificado':
                return <CertificadoIcon />
              case 'Rechazado':
                return <RechazadoIcon />
              case 'Verificado':
                return <VerificadoIcon />
              case 'Vencido':
                return <VencidoIcon />
              default:
                return null
            }
          })()}
        </div>
      </TableCell>
      </TableRow>
      <ConsultarHistoricoContent />
  </>
  )
}

export default DocumentoUserTableRow