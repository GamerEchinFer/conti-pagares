import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import React from 'react'
import { useSelector } from 'react-redux';
import { promissoryNotesSelectors } from '../../../redux/slices/delivery.slice';

interface DeliveryButtonProps {
    handleEntregar: () => void;
    isLoading?: boolean;
}
const DeliveryButton = ({ handleEntregar, isLoading }: DeliveryButtonProps) => {

    const digitalizadoCompleto = useSelector(promissoryNotesSelectors.getDigitalizadoCompleto);

    return (
        <Button
            variant={"contained"}
            onClick={handleEntregar}
            startIcon={isLoading ? <CircularProgress color={"inherit"} size={20} /> : null}
            disabled={isLoading || digitalizadoCompleto == false}
        >
            Entregar
        </Button>
    )
}

export default DeliveryButton