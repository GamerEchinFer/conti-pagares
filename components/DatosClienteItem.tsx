import { DatosCliente } from '../interfaces/interfaces';

type DatosClienteItemProps = {
    datosCliente: DatosCliente,
    handleChangeDatosCliente: (event: any) => void
}

const DatosClienteItem = ({datosCliente, handleChangeDatosCliente}: DatosClienteItemProps) => { // destructuring
  return (
    <>
    <div className="flex justify-start">
      <div className="text-start pl-0 text-2xl md:text-3xl" 
        style={{
          color: "#1D428A",
          fontWeight: "bold",          
        }}
        onChange={handleChangeDatosCliente}
        >
        <div className="flex flex-row" key={datosCliente?.id ?? 0}>
          <div className="1/4 pl-1" >{datosCliente?.codCliente ?? ""}</div>
          <div className="1/4 pl-1" >{datosCliente?.nombreCliente ?? ""}, {datosCliente?.apellidoCliente ?? ""}</div>
        </div>  
      </div>
    </div>
    </>
  )
}

export default DatosClienteItem