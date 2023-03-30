import { DocumentosUsuarioResponse } from '../../interfaces/interfaces';
import { filterByGroup, querySearch } from './documentosHelpers';

import DocumentoUserTableRow from './DocumentoUserTableRow';

type DocumentoUserTableProps = {
  documentosUser: DocumentosUsuarioResponse | undefined,
  query: string,
  handleClickViewDoc: () => void,
  idGroup: number
}


const DocumentoUserTable = ({documentosUser, query, handleClickViewDoc, idGroup }: DocumentoUserTableProps) => {

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
            <DocumentoUserTableRow key={row.datosAdicionales.idDocumento} row={row} handleClickViewDoc={handleClickViewDoc} />
          </>
          ))
        }
    </>
  )
}

export default DocumentoUserTable