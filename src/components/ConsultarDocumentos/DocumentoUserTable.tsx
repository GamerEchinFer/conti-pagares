import { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';

import { ColeccionDocumento, DocumentosUsuarioResponse } from '../../interfaces/interfaces';
import { filterByGroup, querySearch } from './documentosHelpers';
import DocumentoUserTableRow from './DocumentoUserTableRow';
import { theme } from '../../../theme/Theme';
import ButtonIconClose from '../Buttons/ButtonIconClose';
import { capitalizePorPalabra } from '../../helpers/capitalize';
import { RootState } from '../../redux/store';
import BackButton from '../Buttons/BackButton';
import { getDescargarHadoopDirecto } from '../../api/apmDesaApi';
import { parsePdfBase64 } from '../../helpers/cutPdf';
import { useDocumentUser } from './useDocumentoUser';
import PDFComponent from '../SubirDocumentos/PDFComponent';

type DocumentoUserTableProps = {
  documentosUser: DocumentosUsuarioResponse | undefined,
  query: string,
  handleClickViewDoc: () => void,
  idGroup: number,
  
}


const DocumentoUserTable = ({documentosUser, query, handleClickViewDoc, idGroup }: DocumentoUserTableProps) => {

  const {datosCliente, fullScreen, open, handleClickRow, handleClose, rowSelected, base64} = useDocumentUser()

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

           
          </>
          ))
        }
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
              <DialogContentText
                  className="pb-4">
                    {rowSelected?.datosAdicionales?.rutaHadoop ?? ""}
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
              <div className="max-w-10xl grid grid-cols" style={{width:"160%"}}>
              <DialogContent>
                <PDFComponent base64={base64 ?? ""} /> 
              </DialogContent>  
              </div>
          </div>
        </Dialog>
    </>
  )
}

export default DocumentoUserTable