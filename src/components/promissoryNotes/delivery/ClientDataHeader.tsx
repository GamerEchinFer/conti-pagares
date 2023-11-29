import React, { useState } from 'react'
import AsyncInputLabel from '../../shared/form/AsyncInputLabel'
import InfoLabel from '../../shared/form/InfoLabel'

interface ClientDataHeaderProps{
    client: string;
    codClient: string;
}
const ClientDataHeader = ({ client, codClient }: ClientDataHeaderProps) => {
    const [ valueClient, setValueClient ] = useState(client);

    const handleCompleteSearch = (data: ClientData) => {
        setValueClient(`
            ${data.primerNombre} 
            ${data.segundoNombre} 
            ${data.primerApellido} 
            ${data.segundoApellido} 
        `);
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