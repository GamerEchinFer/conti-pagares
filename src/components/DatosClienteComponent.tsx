import { useState } from 'react'
import { useDatosCliente } from '../hooks/useDatosCliente';
import DatosClienteItem from './DatosClienteItem';

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