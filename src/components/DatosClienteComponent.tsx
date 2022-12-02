import { useState } from 'react'
import { useSelector } from 'react-redux';
import { useDatosCliente } from '../hooks/useDatosCliente';
import { RootState } from '../redux/store';
import DatosClienteItem from './DatosClienteItem';

function DatosClienteComponent() {

    // const [datoCliente, SetDatoCliente] = useState("");

    const datosCliente = useSelector((state: RootState) => state.clienteDatos.items);

    // const handleChangeDatosCliente = (event : any) => 
    // SetDatoCliente("datosClientes");
    
    // const datosCliente = useDatosCliente();
    if(!datosCliente) return null;

    return <DatosClienteItem
        datosCliente={datosCliente}    
    />
}

export default DatosClienteComponent