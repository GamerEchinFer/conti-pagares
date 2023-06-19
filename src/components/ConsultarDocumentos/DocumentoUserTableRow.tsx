import { ColeccionDocumento } from '../../interfaces/interfaces';
import SearchIcon from '@mui/icons-material/Search';
import { TableCell, TableRow } from '@mui/material';
import { capitalize } from '../../helpers/capitalize';
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

type DocumentoUserTableRowProps = {
  row: ColeccionDocumento,
  handleClickViewDoc?: () => void,
  onClickRow: () => void
}

const DocumentoUserTableRow = ({row, handleClickViewDoc, onClickRow}: DocumentoUserTableRowProps) => {

  const datosCliente = useSelector((state: RootState) => state.clienteDatos.items);

  const documentosUser = useSelector((state: RootState) => state.documentosUser.items);        
  
  const dispatch = useDispatch();
  
  const [open, setOpen] = useState(false);

  const openTipoDocHistorico = () => {        
    dispatch(getTipoDocumentoHistoricoAction(datosCliente.codigoCliente, row.datosAdicionales.codigoTipoDocumento))   
  }

  const openConsultaDocPDF = () => {        
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
          <div className="flex justify-start">
            {(() => {
              switch(capitalize(`${row.datosAdicionales.codigoEstadoDocumento}`)) {
                case 'Pendiente':
                  return <span className='text-[#FFC000]  border-gray-300 p-2 bg-gray-200'>Pendiente</span>
                case 'Certificado':
                  return <span className='text-[#70AD47]'>Certificado</span>
                case 'Rechazado':
                  return <span className='text-[#FF4747]'>Rechazado</span>
                case 'Verificado':
                  return <span className='text-[#5b9bd5]'>Verificado</span>
                case 'Vencido':
                  return <span className='text-[#7f6000]'>Vencido</span>
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