import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Unstable_Grid2'
import React from 'react'
import { PromissoryNotesConsultDelivery } from '../../../interfaces/promissoryNotes';
import { promissoryNotesDeliveryActions } from '../../../redux/slices/delivery.slice';
import { useDispatch } from 'react-redux';

interface FormActionsProps {
    promissoryNotesSelected: PromissoryNotesConsultDelivery[];
}
const FormActions = ({ promissoryNotesSelected }: FormActionsProps) => {
    const dispatch = useDispatch();
    const handlePrint = () => {
        dispatch(promissoryNotesDeliveryActions.setPdfShowModal(true));
        dispatch(promissoryNotesDeliveryActions.setFormShowModal(false));
    }

    const handleDigitalizar = () => {

    }

    const handleReprint = () => {

    }

    return (
        <Grid container alignItems={"flex-start"}>
            <Grid xs={6} display={"flex"} flexWrap={"wrap"} gap={2}>
                <Button variant={"outlined"} onClick={handlePrint}>Imprimir Acuse</Button>
                <Button variant={"outlined"} onClick={handleDigitalizar}>Digitalizar Acuse</Button>
                <Button variant={"outlined"} onClick={handleReprint}>Reimprimir Acuse</Button>
            </Grid>
            <Grid xs={6} display={"flex"} justifyContent={"flex-end"}>
                <Button variant={"contained"}>Entregar</Button>
            </Grid>
        </Grid>
    )
}

export default FormActions