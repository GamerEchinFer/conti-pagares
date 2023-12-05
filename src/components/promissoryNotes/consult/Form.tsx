import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import React from 'react'
import InfoLabel from '../../shared/form/InfoLabel'
import DetailDataTable from './DetailDataTable'
import DeliveryComment from './DeliveryComment'
import { PromissoryNotesConsult } from '../../../models/responses/promissoryNotes'
import { EPromissoryNotesStatus, PromissoryNotesStatusHistory } from '../../../interfaces/promissoryNotes'
import { promissoryNotesHelper } from '../../../helpers/promissoryNotes'

interface FormProps {
    promissoryNotesConsult: PromissoryNotesConsult | null;
}
const Form = ({ promissoryNotesConsult }: FormProps) => {
    const statusHistory: PromissoryNotesStatusHistory[] = promissoryNotesConsult ?
        promissoryNotesHelper.generateStatusHistory(promissoryNotesConsult) : [];


    return (
        <Stack
            spacing={3}
        >
            <InfoLabel label='Cliente' value={promissoryNotesConsult?.cliente?.nombreCliente ?? ""} />

            <Box sx={{
                display: "flex",
                gap: 5
            }}>
                <InfoLabel label='Operacion' value={promissoryNotesConsult?.operacion ?? ""} />

                <InfoLabel label='Cuota' value={promissoryNotesConsult?.cuota ?? ""} />

                <InfoLabel label='Nro Operación' value={"NO DEFINIDO"} />
            </Box>

            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1
            }}>
                <DetailDataTable promissoryNotesStatusHistory={statusHistory} />
            </Box>

            {/* <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1
            }}>
                <DeliveryComment content={promissoryNotesConsult?.observacion ?? ""} />
            </Box> */}

        </Stack>
    )
}

export default Form