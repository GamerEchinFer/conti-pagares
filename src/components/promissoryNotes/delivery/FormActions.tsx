import Button from '@mui/material/Button'
import Grid from '@mui/material/Unstable_Grid2'
import React, { memo, useState } from 'react'
import { promissoryNotesDeliveryActions, promissoryNotesSelectors } from '../../../redux/slices/delivery.slice';
import { useDispatch, useSelector } from 'react-redux';
import { promissoryNotesServices } from '../../../services/promissoryNotesService';
import { RootState } from '../../../redux/store';
import CircularProgress from '@mui/material/CircularProgress';
import DeliveryButton from './DeliveryButton';


const FormActions = memo(() => {
    const dispatch = useDispatch();
    const promissoryNotesForm = useSelector(promissoryNotesSelectors.getPromissoryNotesForm);
    const clienteRetira = useSelector(promissoryNotesSelectors.getClienteRetira);
    const usuarios = useSelector((state: RootState) => state.auth.datosAgente);
    const [isLoading, setIsLoading] = useState(false);

    const handlePrint = () => {
        dispatch(promissoryNotesDeliveryActions.setPdfShowModal(true));
        dispatch(promissoryNotesDeliveryActions.setFormShowModal(false));
    }

    const handleDigitalizar = () => {
        dispatch(promissoryNotesDeliveryActions.setAttachShowModal(true));
        dispatch(promissoryNotesDeliveryActions.setFormShowModal(false));
    }

    const handleReprint = () => {
        dispatch(promissoryNotesDeliveryActions.setPdfShowModal(true));
        dispatch(promissoryNotesDeliveryActions.setFormShowModal(false));
    }

    const handleEntregar = async () => {
        setIsLoading(true);
        const clienteRetiraCodigoCliente = clienteRetira?.codigoCliente;
        for await (const promissoryNote of promissoryNotesForm) {
            await promissoryNotesServices.deliveryPromissoryNote({
                operacion: promissoryNote.operacion,
                cuota: promissoryNote.cuota,
                clienteretira: clienteRetiraCodigoCliente,
                observacion: promissoryNote.observacion,
                usuario: usuarios?.codigo ?? "",
            });
        }
        setIsLoading(false);
    }

    return (
        <Grid container alignItems={"flex-start"}>
            <Grid xs={6} display={"flex"} flexWrap={"wrap"} gap={2}>
                <Button variant={"outlined"} onClick={handlePrint}>Imprimir Acuse</Button>
                <Button variant={"outlined"} onClick={handleDigitalizar}>Digitalizar Acuse</Button>
                <Button variant={"outlined"} onClick={handleReprint}>Reimprimir Acuse</Button>
            </Grid>
            <Grid xs={6} display={"flex"} justifyContent={"flex-end"}>
                <DeliveryButton
                    handleEntregar={handleEntregar}
                    isLoading={isLoading}
                />
            </Grid>
        </Grid>
    )
})
export default FormActions