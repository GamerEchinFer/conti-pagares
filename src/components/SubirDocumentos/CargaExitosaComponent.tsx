import React from 'react'
import Check from "../../assets/svg/Check.svg";
const CargaExitosaComponent = () => {
  return (
    <>
      <div className="flex justify-center pt-20">
        <img src={Check} alt="check" />
      </div>
      <div style={{color:"#00438A",fontSize:"24px"}}>Legajo: 0234553</div>
      <div style={{color:"#00438A",fontSize:"16px"}}>Documentos cargados de manera exitosa</div>
    </>
  )
}

export default CargaExitosaComponent