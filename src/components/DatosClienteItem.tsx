import { ClienteDatos } from '../interfaces/interfaces';

type DatosClienteItemProps = {
    datosCliente: ClienteDatos,    
}

const DatosClienteItem = ({datosCliente}: DatosClienteItemProps) => { // destructuring
  return (
    <>
    <div className="flex justify-start">
      <div className="text-start pl-0 text-2xl md:text-3xl" 
        style={{
          color: "#1D428A",
          fontWeight: "bold",
          fontSize:"30px"          
        }}        
        >
        <div className="flex flex-row">
          <div className="1/4 pl-1" >{datosCliente?.codigoCliente ?? ""}</div>
          <div className="1/4 pl-1" >{datosCliente?.primerNombre ?? ""} {datosCliente?.segundoNombre ?? ""}, {datosCliente?.primerApellido ?? ""} {datosCliente?.segundoApellido ?? ""}</div>
        </div>  
      </div>
    </div>
    </>
  )
}

export default DatosClienteItem