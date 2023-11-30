import Stack from '@mui/material/Stack'
import React, { useCallback } from 'react'
import Box from '@mui/material/Box';
import CardItemDelivery from './CardItemDelivery';
import InputObsGeneral from './InputObsGeneral';
import ClientDataHeader from './ClientDataHeader';
import FormActions from './FormActions';
import { PromissoryNotesConsult } from '../../../models/responses/promissoryNotes';
import { promissoryNotesHelper } from '../../../helpers/promissoryNotes';

interface FormProps {
    promissoryNotesSelected: PromissoryNotesConsult[];
}
const Form = ({ promissoryNotesSelected }: FormProps) => {
    const { getRowId } = promissoryNotesHelper;
    const client = promissoryNotesSelected?.length > 0 ? promissoryNotesSelected[0].cliente.nombreCliente : "";
    const codClient = promissoryNotesSelected?.length > 0 ? promissoryNotesSelected[0].cliente.codigoCliente : "";
    return (<>
        <Stack width={900} spacing={3}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                alignItems: "flex-start"
            }}>
                <ClientDataHeader
                    client={client}
                    codClient={codClient}
                />
            </Box>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2
            }}>
                {promissoryNotesSelected.map((item, index) => (<CardItemDelivery key={index} id={getRowId(item)} item={item} />))}
            </Box>

            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2
            }}>
                <InputObsGeneral label={"Observación"} />
            </Box>
            <Box>
                <FormActions />
            </Box>
        </Stack>
    </>
    )
}

export default Form