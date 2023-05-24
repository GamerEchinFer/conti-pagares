import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import DatosClienteItem from './DatosClienteItem';

function DatosClienteComponent() {

    const datosCliente = useSelector((state: RootState) => state.clienteDatos.items);
    
    if(!datosCliente) return null;

    return <DatosClienteItem
        datosCliente={datosCliente}    
    />
}

export default DatosClienteComponent