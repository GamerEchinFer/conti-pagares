import Button from '@mui/material/Button'
import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { promissoryNotesDeliveryActions, promissoryNotesSelectors } from '../../../redux/slices/delivery.slice';

const DigitalizarButton = memo(() => {
    const digitalizadoCompleto = useSelector(promissoryNotesSelectors.getDigitalizadoCompleto);
    const dispatch = useDispatch();
    const handleDigitalizar = () => {
        dispatch(promissoryNotesDeliveryActions.setAttachShowModal(true));
        dispatch(promissoryNotesDeliveryActions.setFormShowModal(false));
    }


    return (
        <>
            <Button
                variant={"outlined"}
                onClick={handleDigitalizar}
                disabled={digitalizadoCompleto}
            >
                Digitalizar Acuse
            </Button>
        </>

    )
});

export default DigitalizarButton