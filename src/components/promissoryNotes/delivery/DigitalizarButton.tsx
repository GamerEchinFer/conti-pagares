import Button from '@mui/material/Button'
import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { promissoryNotesDeliveryActions, promissoryNotesSelectors } from '../../../redux/slices/delivery.slice';

interface DigitalizarButtonProps {
    handleDigitalizar: () => void;
}
const DigitalizarButton = memo(({ handleDigitalizar }: DigitalizarButtonProps) => {
    const digitalizadoCompleto = useSelector(promissoryNotesSelectors.getDigitalizadoCompleto);
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