import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const TableContainerComponent = () => {
  const documentosUser = useSelector((state: RootState) => state.documentosUser.items);        
  const [query, setQuery] = useState("");
  return (
    <>
      {documentosUser?.coleccionDocumento?.filter((index) =>
        index.datosAdicionales.descripcion.toLowerCase().includes(query)
        )
        .map((index) => (
          <span key={index.datosAdicionales.idDocumento}>
          {index.datosAdicionales.descripcion.toLowerCase()}
          </span>
        ))
      }                 
    </>
  )
}

export default TableContainerComponent