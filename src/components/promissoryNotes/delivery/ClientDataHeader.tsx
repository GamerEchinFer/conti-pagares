import React, { useState } from 'react'
import AsyncInputLabel from '../../shared/form/AsyncInputLabel'
import InfoLabel from '../../shared/form/InfoLabel'
import { useDispatch } from 'react-redux';
import { promissoryNotesDeliveryActions } from '../../../redux/slices/delivery.slice';

interface ClientDataHeaderProps {
    client: string;
    codClient: string;
}
const ClientDataHeader = ({ client, codClient }: ClientDataHeaderProps) => {
    const [valueClient, setValueClient] = useState(client);
    const dispatch = useDispatch();

    const handleCompleteSearch = (data: ClientData | null) => {
        if (data == null) {
            dispatch(promissoryNotesDeliveryActions.setClienteRetira({
                tipoDocumento: "",
                codigoCliente: "",
                nombreCliente: ""
            }));
            return;
        } else {

            const nombreCompletoCliente = `${data.primerNombre} ${data.segundoNombre} ${data.primerApellido} ${data.segundoApellido}`;
            setValueClient(nombreCompletoCliente);

            dispatch(promissoryNotesDeliveryActions.setClienteRetira({
                tipoDocumento: data.tipoDocumento,
                codigoCliente: data.codigoCliente,
                nombreCliente: nombreCompletoCliente
            }));
        }

    }

    return (
        <>
            <AsyncInputLabel<ClientData>
                label={"Cliente/Autorizado"}
                value={codClient}
                sx={{ width: "100%" }}
                endPoint="crc-client-data"
                onComplete={handleCompleteSearch}
            />
            <InfoLabel
                label={"Nombre y Apellido"}
                value={`${valueClient}`}
                variant='input-read-only'
                sx={{ width: "100%" }}
                valuePropsSx={{ flexGrow: 1, flexShrink: 1, overflow: "auto" }}
            />
        </>
    )
}

export default ClientDataHeader