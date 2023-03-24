import { useState } from 'react';
import { DocumentosUsuarioResponse } from '../../interfaces/interfaces';

import DocumentoUserTableRow from './DocumentoUserTableRow';

type DocumentoUserTableProps = {
  documentosUser: DocumentosUsuarioResponse | undefined,
  query: string
  handleClickViewDoc: () => void
}


const DocumentoUserTable = ({documentosUser, query, handleClickViewDoc}: DocumentoUserTableProps) => {

  if (!documentosUser) {
    return null
  }

  const documentosUserFilter = documentosUser && documentosUser.coleccionDocumento ? documentosUser.coleccionDocumento
  .filter((index) =>
    index.datosAdicionales.descripcion.trim().toLowerCase().includes(query.trim().toLowerCase())
  ) : []

  if (documentosUserFilter.length === 0) return null

  return (
    <>
      {
        documentosUserFilter.map(row => ( 
          <DocumentoUserTableRow key={row.datosAdicionales.idDocumento} row={row} handleClickViewDoc={handleClickViewDoc} />
        ))
      }
    </>
  )
}

export default DocumentoUserTable