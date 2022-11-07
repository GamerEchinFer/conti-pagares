import { useState } from 'react'
import DatosClienteItem from './DatosClienteItem';
import { useDatosCliente } from '../hooks/useDatosCliente';

function DatosClienteComponent() {

    const [datoCliente, SetDatoCliente] = useState("");

    const handleChangeDatosCliente = (event : any) => 
    SetDatoCliente("datosClientes");
    
    const datosCliente = useDatosCliente();
    if(!datosCliente) return null;

    return <DatosClienteItem
    datosCliente={datosCliente}
    handleChangeDatosCliente={handleChangeDatosCliente}
    />
}

export default DatosClienteComponent