import Button from '@mui/material/Button'
import Grid from '@mui/material/Unstable_Grid2'
import React, { memo, useState } from 'react'
import { promissoryNotesDeliveryActions, promissoryNotesSelectors } from '../../../redux/slices/delivery.slice';
import { useDispatch, useSelector } from 'react-redux';
import { promissoryNotesServices } from '../../../services/promissoryNotesService';
import { RootState } from '../../../redux/store';
import DeliveryButton from './DeliveryButton';
import DigitalizarButton from './DigitalizarButton';
import { errorNotify, successNotify } from '../../../helpers/notify';


const FormActions = memo(() => {
    const dispatch = useDispatch();
    const promissoryNotesForm = useSelector(promissoryNotesSelectors.getPromissoryNotesForm);
    const clienteRetira = useSelector(promissoryNotesSelectors.getClienteRetira);
    const usuarios = useSelector((state: RootState) => state.auth.datosAgente);
    const [isLoading, setIsLoading] = useState(false);

    const handlePrint = () => {
        if (clienteRetira.codigoCliente === "") {
            errorNotify("Debe seleccionar un cliente");
            return;
        }
        dispatch(promissoryNotesDeliveryActions.setPdfShowModal(true));
        dispatch(promissoryNotesDeliveryActions.setFormShowModal(false));
    }

    const handleReprint = () => {
        if (clienteRetira.codigoCliente === "") {
            errorNotify("Debe seleccionar un cliente");
            return;
        }
        dispatch(promissoryNotesDeliveryActions.setPdfShowModal(true));
        dispatch(promissoryNotesDeliveryActions.setFormShowModal(false));
    }

    const handleDigitalizar = () => {
        if (clienteRetira.codigoCliente === "") {
            errorNotify("Debe seleccionar un cliente");
            return;
        }
        dispatch(promissoryNotesDeliveryActions.setAttachShowModal(true));
        dispatch(promissoryNotesDeliveryActions.setFormShowModal(false));
    }

    const handleEntregar = async () => {
        setIsLoading(true);
        const clienteRetiraCodigoCliente = clienteRetira?.codigoCliente;
        let error = false;
        const departamento = usuarios?.sucursal?.codigo == "01" ? usuarios.departamento.codigo : 999;
        for await (const promissoryNote of promissoryNotesForm) {
            if (error) return;
            try {
                await promissoryNotesServices.deliveryPromissoryNote({
                    operacion: promissoryNote.operacion,
                    cuota: promissoryNote.cuota,
                    clienteretira: clienteRetiraCodigoCliente,
                    observacion: promissoryNote.observacion,
                    usuario: usuarios?.codigo ?? "",
                    departamento: departamento.toString()
                });
            } catch (error) {
                error = true;
            }
        }
        if(error){
            errorNotify("Ocurrió un error al entregar el pagaré");
            setIsLoading(false);
            return;
        }
        successNotify("Pagaré entregado correctamente");
        setIsLoading(false);
    }

    return (
        <Grid container alignItems={"flex-start"}>
            <Grid xs={6} display={"flex"} flexWrap={"wrap"} gap={2}>
                <Button variant={"outlined"} onClick={handlePrint}>Imprimir Acuse</Button>
                <DigitalizarButton handleDigitalizar={handleDigitalizar} />
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