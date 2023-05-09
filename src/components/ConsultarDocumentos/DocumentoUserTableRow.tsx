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