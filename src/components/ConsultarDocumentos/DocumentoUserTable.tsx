import { Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import { DocumentosUsuarioResponse } from '../../interfaces/interfaces';
import { filterByGroup, querySearch } from './documentosHelpers';
import DocumentoUserTableRow from './DocumentoUserTableRow';
import ButtonIconClose from '../Buttons/ButtonIconClose';
import { capitalizePorPalabra } from '../../helpers/capitalize';
import BackButton from '../Buttons/BackButton';
import { useDocumentUser } from './useDocumentoUser';
import PDFComponent from '../SubirDocumentos/PDFComponent';
import moment from 'moment';

type DocumentoUserTableProps = {
  documentosUser: DocumentosUsuarioResponse | undefined,
  query: string,
  handleClickViewDoc: () => void,
  idGroup: number
}

const DocumentoUserTable = ({documentosUser, query, handleClickViewDoc, idGroup }: DocumentoUserTableProps) => {

  const {datosCliente, fullScreen, open, handleClickRow, handleClose, rowSelected, base64} = useDocumentUser();

  if (!documentosUser) {
    return null
  }

  const documentosUserFilter = documentosUser && documentosUser.coleccionDocumento ? documentosUser.coleccionDocumento
  .filter(querySearch(query))
  .filter(filterByGroup(idGroup))
  : []

  if (documentosUserFilter.length === 0) return null
  
  return (
    <>
      {
        documentosUserFilter.map(row => (
          <> 
            <DocumentoUserTableRow key={row.datosAdicionales.idDocumento} row={row} onClickRow={() => handleClickRow(row)} />
            <Dialog
              fullScreen={fullScreen}
              open={open}
              onClose={handleClose}
              aria-labelledby="draggable-dialog-title"
              PaperProps={{ sx: { top: 10, m: 0 , maxWidth: "90%", height: "90%" }}}
            >
              <DialogActions>
                <ButtonIconClose 
                  autoFocus={true}
                  onClick={handleClose}
                />
              </DialogActions>
              <div className="max-w-6xl grid grid-cols-2 gap-10">
                <DialogContent>
                  <DialogContentText className="pb-4">
                    <div>{rowSelected?.datosAdicionales?.descripcion ?? ""}</div>
                    <div className="pr-10" style={{ color: "#373A3C", fontSize:"16px"}}>Código de Cliente 
                      <span style={{color:"#818A91", fontSize:"16px"}}> {datosCliente.codigoCliente}</span></div>
                    <div className="pr-10">
                      {(datosCliente.primerNombre ? `${capitalizePorPalabra(`${datosCliente?.primerNombre ?? ''}`)} ${capitalizePorPalabra(`${datosCliente?.segundoNombre ?? ''}`)} ${datosCliente?.primerApellido ?? ''} ${datosCliente?.segundoApellido ?? ''}` : '')}
                    </div>
                    <div className="pr-10  pt-2" style={{ color: "#373A3C", fontSize:"16px"}}>Clasificación</div>
                    <span className="pr-10">{datosCliente.clasificacion ?? "No posee Clasificación"}</span>
                    <div className="consultaDocumento">Fecha Documento</div>
                    <span className="pr-10 pb-2">{moment(rowSelected?.datosAdicionales?.fechaEmision).format('DD/MM/YYYY')}</span>
                    <div className="consultaDocumento">Vence {moment(rowSelected?.datosAdicionales?.fechaVencimiento).format('DD/MM/YYYY')}</div>
                    <div className="consultaDocumento">Nro. Cuentas 0</div>
                    <div className="pr-10 pb-4 pt-2" style={{ color: "#373A3C", fontSize:"16px"}}>Nro. Operación </div>
                    <div className="pr-10 pb-4">{rowSelected?.datosAdicionales?.numeroOperacion ?? "No posee número de operación"}</div>
                    <div className="consultaDocumento" style={{ color: "#373A3C", fontSize:"16px"}}>Carga</div>
                    <span className="pr-10">{rowSelected?.datosAdicionales?.usuarioCarga}</span>
                    <div className="consultaDocumento" style={{ color: "#373A3C", fontSize:"16px"}}>Verifica </div>
                    <span className="pr-10">{rowSelected?.datosAdicionales?.usuarioVerificador ?? "No posee Usuario Verificador"}</span>
                    <div className="consultaDocumento" style={{ color: "#373A3C", fontSize:"16px"}}>Certifica</div>
                    <span className="pr-10">{rowSelected?.datosAdicionales?.userAprobador ?? "No posee usuario Certificador "}</span>
                  </DialogContentText>
                    <div className="flex flex-row justify-center pb-4">
                      <BackButton onClick={handleClose}/>
                    </div>
                </DialogContent>
                <div className="max-w-10xl grid grid-cols" style={{width:"160%"}}>
                  <DialogContent>
                    <PDFComponent base64={base64 ?? ""} /> 
                  </DialogContent>  
                </div>
              </div>
            </Dialog>
          </>
        ))
      }
    </>
  )
}

export default DocumentoUserTable