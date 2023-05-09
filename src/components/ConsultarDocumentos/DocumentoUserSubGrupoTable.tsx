import { TableRow, useMediaQuery } from '@mui/material';
import useCollapse from 'react-collapsed';
import { capitalize } from '../../helpers/capitalize';
import { DocumentoUsuarioResult } from '../../helpers/documentUserMapper';
import ArrowIconDown from '../ArrowIconsComponent/ArrowIconDown';
import ArrowIconUp from '../ArrowIconsComponent/ArrowIconUp';
import DocumentoUserSubGrupoRow from './DocumentoUserSubGrupoRow';

import { Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';

import { capitalizePorPalabra } from '../../helpers/capitalize';
import BackButton from '../Buttons/BackButton';
import ButtonIconClose from '../Buttons/ButtonIconClose';
import { ColeccionDocumento } from '../../interfaces/interfaces';
import { useState } from 'react';
import { theme } from '../../../theme/Theme';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import PDFComponent from '../SubirDocumentos/PDFComponent';
import { getDescargarHadoopDirecto } from '../../api/apmDesaApi';
import { parsePdfBase64 } from '../../helpers/cutPdf';
import { useDocumentUser } from './useDocumentoUser';


type DocumentoUserTableSubGrupoProps = {
  documentosUser: DocumentoUsuarioResult | undefined,
  toggle: {[key: string]: boolean},
  setToggle: (value: string) => void,
  query: string,
  handleClickViewDoc: () => void,
  onClickRow: (row: ColeccionDocumento) => void
}

function DocumentoUserCollapsible({documentosUser, handleClickViewDoc, labelSubgrupo, onClickRow}: any) {

  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse(); 

  const handleClickDown = () => {
    
  }

  return (
    <>    
      <div style={{
        color: "#1D428A",
        fontSize: "16px",
        fontWeight:"bold" 
      }}
      className="pt-2 pl-6"
      >
        {(capitalize(`${labelSubgrupo}`))}
      </div>
      <span {...getToggleProps()}>
        {isExpanded ? <ArrowIconUp onClick={() => console.log(labelSubgrupo)} /> : <ArrowIconDown onClick={handleClickDown} />}
      </span>
      {
        documentosUser[labelSubgrupo].map((row: ColeccionDocumento) => (
          <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            key={row.datosAdicionales.idDocumento}
            {...getCollapseProps()}
          >
            <DocumentoUserSubGrupoRow 
              key={row.datosAdicionales.idDocumento} 
              row={row} 
              handleClickViewDoc={handleClickViewDoc}
              onClickRow={() => onClickRow(row)}
            />
          </TableRow>
        ))
      }
    </>
  )
}

const DocumentoUserSubGrupoTable = ({documentosUser, query, handleClickViewDoc, setToggle, toggle}: DocumentoUserTableSubGrupoProps) => {

  // Custom Hook
  const {datosCliente, fullScreen, open, handleClickRow, handleClose, rowSelected, base64} = useDocumentUser()

  if (!documentosUser) {
    return null
  }  

  return (
    <>         
      {
        Object.keys(documentosUser).map(labelSubgrupo => (
          <>
            <DocumentoUserCollapsible 
              documentosUser={documentosUser} 
              handleClickViewDoc={handleClickViewDoc} 
              labelSubgrupo={labelSubgrupo}
              key={labelSubgrupo} //ware
              onClickRow={handleClickRow}
            />
          </>
        ))
        }    
        {/* {JSON.stringify(documentosUser)} */}
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
                <div className="max-w-10xl grid grid-cols" style={{width:"160%"}} >
                <DialogContent>
                  <PDFComponent base64={base64 ?? ""} />
                </DialogContent>  
                </div>
            </div>  
            </Dialog>
    </>
  )
}

export default DocumentoUserSubGrupoTable