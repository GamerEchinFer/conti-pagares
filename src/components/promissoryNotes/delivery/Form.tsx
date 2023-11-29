import Stack from '@mui/material/Stack'
import React from 'react'
import InfoLabel from '../../shared/form/InfoLabel'
import { PromissoryNotesConsultDelivery, PromissoryNotesItemCard } from '../../../interfaces/promissoryNotes';
import Box from '@mui/material/Box';
import CardItemDelivery from './CardItemDelivery';
import CellCardItemObs from './CellCardItemObs';
import InputObsGeneral from './InputObsGeneral';
import AsyncInputLabel from '../../shared/form/AsyncInputLabel';
import ClientDataHeader from './ClientDataHeader';
import FormActions from './FormActions';

interface FormProps {
    promissoryNotesSelected: PromissoryNotesConsultDelivery[];
}
const Form = ({ promissoryNotesSelected }: FormProps) => {
    const client = promissoryNotesSelected?.length > 0 ? promissoryNotesSelected[0].cliente.nombreCliente : "";
    const codClient = promissoryNotesSelected?.length > 0 ? promissoryNotesSelected[0].cliente.codigoCliente : "";
    const itemCard: PromissoryNotesItemCard[] = [];
    promissoryNotesSelected?.forEach(pn => {
        pn.subRows?.forEach(sr => {
            itemCard.push({
                nroEnvio: sr.numeroEnvio,
                operacion: sr.operacion,
                fecha: sr.fechaVencimiento,
                observacion: sr.observacion
            })
        })
    });
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
                {itemCard.map(item => (<CardItemDelivery item={item} />))}
            </Box>

            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2
            }}>
                <InputObsGeneral label={"Observación"} value={""} />
            </Box>
            <Box>
                <FormActions promissoryNotesSelected={promissoryNotesSelected} />
            </Box>
        </Stack>
    </>
    )
}

export default Form