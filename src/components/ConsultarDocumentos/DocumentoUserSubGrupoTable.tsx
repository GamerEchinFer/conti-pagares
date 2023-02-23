import DocumentoUserTableRow from './DocumentoUserTableRow';
import { DocumentoUsuarioResult } from '../../helpers/documentUserMapper';
import { capitalize } from '../../helpers/capitalize';
import ArrowIconDown from '../ArrowIconsComponent/ArrowIconDown';
import useCollapse from 'react-collapsed';
import ArrowIconUp from '../ArrowIconsComponent/ArrowIconUp';
import { Divider, TableBody, TableRow } from '@mui/material';
import DocumentoUserSubGrupoRow from './DocumentoUserSubGrupoRow';

type DocumentoUserTableSubGrupoProps = {
  documentosUser: DocumentoUsuarioResult | undefined,
  toggle: {[key: string]: boolean}
  setToggle: (value: string) => void
  query: string
  handleClickViewDoc: () => void
}

function DocumentoUserCollapsible({documentosUser, handleClickViewDoc, labelSubgrupo}: any) {

  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse(); 

  const handleClickDown = () => {
    
  }

  return (
    <>    
      {/* <div  >           */}
        {(capitalize(`${labelSubgrupo}`))}
        {/* <ArrowIconDown onClick={() => setToggle(labelSubgrupo)} /> */}
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
      {/* </div>                 */}
      {/* <Divider className="pb-4" /> */}
    </>
  )
}

const DocumentoUserSubGrupoTable = ({documentosUser, query, handleClickViewDoc, setToggle, toggle}: DocumentoUserTableSubGrupoProps) => {

  if (!documentosUser) {
    return null
  }  

  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse(); 

  const handleClickDown = () => {

  }

  return (
    <>         
      {
          Object.keys(documentosUser).map(labelSubgrupo => (
            // <div key={labelSubgrupo} className="">
            <>
            <DocumentoUserCollapsible 
              documentosUser={documentosUser} 
              handleClickViewDoc={handleClickViewDoc} 
              labelSubgrupo={labelSubgrupo}
              key={labelSubgrupo} //ware
              />
            
            </>
            // <div key={labelSubgrupo} className={styles.header} {...getToggleProps()}>
                
            //   {(capitalize(`${labelSubgrupo}`))}
            //   {/* <ArrowIconDown onClick={() => setToggle(labelSubgrupo)} /> */}
            //     {isExpanded ? <ArrowIconUp onClick={() => setToggle(labelSubgrupo)} /> : <ArrowIconDown onClick={handleClickDown} />}

            //   {/* <button onClick={() => setToggle(labelSubgrupo)}>Abrir</button> */}
            //   {
            //     documentosUser[labelSubgrupo].map((row) => (
            //       <div {...getCollapseProps()}>
                    
            //       <DocumentoUserTableRow 
            //         key={row.datosAdicionales.idDocumento} 
            //         row={row} 
            //         handleClickViewDoc={handleClickViewDoc}
                    
            //       />
            //       </div>
            //     ))
            //   }                 
            // </div>
          ))
        }      
    </>
  )
}

export default DocumentoUserSubGrupoTable