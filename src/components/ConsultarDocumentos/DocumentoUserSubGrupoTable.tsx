import { DocumentoUsuarioResult } from '../../helpers/documentUserMapper';
import { capitalize } from '../../helpers/capitalize';
import ArrowIconDown from '../ArrowIconsComponent/ArrowIconDown';
import useCollapse from 'react-collapsed';
import ArrowIconUp from '../ArrowIconsComponent/ArrowIconUp';
import { TableRow } from '@mui/material';
import DocumentoUserSubGrupoRow from './DocumentoUserSubGrupoRow';
import { ColeccionDocumento } from '../../interfaces/interfaces';

type DocumentoUserTableSubGrupoProps = {
  documentosUser: DocumentoUsuarioResult | undefined,
  toggle: {[key: string]: boolean}
  setToggle: (value: string) => void
  query: string,
  handleClickViewDoc: () => void
}

function DocumentoUserCollapsible({documentosUser, handleClickViewDoc, labelSubgrupo}: any) {

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
        documentosUser[labelSubgrupo].map((row: any) => (
          <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            key={row.datosAdicionales.idDocumento}
            {...getCollapseProps()}
          >
            <DocumentoUserSubGrupoRow 
              key={row.datosAdicionales.idDocumento} 
              row={row} 
              handleClickViewDoc={handleClickViewDoc}
            />
          </TableRow>
        ))
      }
    </>
  )
}

const DocumentoUserSubGrupoTable = ({documentosUser, query, handleClickViewDoc, setToggle, toggle}: DocumentoUserTableSubGrupoProps) => {

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
              />
            </>
          ))
        }    
        {/* {JSON.stringify(documentosUser)} */}
    </>
  )
}

export default DocumentoUserSubGrupoTable