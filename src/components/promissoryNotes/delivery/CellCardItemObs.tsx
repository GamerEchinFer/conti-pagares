import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { TextField } from '@mui/material';
import { PromissoryNotesConsult } from '../../../models/responses/promissoryNotes';
import { useDispatch, useSelector } from 'react-redux';
import { promissoryNotesDeliveryActions, promissoryNotesSelectors } from '../../../redux/slices/delivery.slice';

interface CellCardItemProps {
    id: string;
    value?: string;
    label?: string;
}
const CellCardItemObs = ({ label, id, value }: CellCardItemProps) => {
    const dispatch = useDispatch();

    const currentItem = useSelector((state: any) => promissoryNotesSelectors.getPromissoryNotesFormById(state, id));

    const [value_, setValue_] = useState(value ?? currentItem?.observacion ?? "");
    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue_(e.target.value);
    }

    const handleBlur = () => {
        if (currentItem) {
            dispatch(promissoryNotesDeliveryActions.setPromissoryNotesFormItem(
                {
                    id: id,
                    promissoryNotesConsult: {
                        ...currentItem,
                        observacion: value_
                    }
                }
            ));
            const oldValue = currentItem?.observacion ?? "";
            if (oldValue !== value_) {
                dispatch(promissoryNotesDeliveryActions.setPromissoryNoteObservation(""));
            }
        }
    }

    return (
        <Box display={"flex"} flexDirection={"column"}>
            <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                {label != "" ? label : ""}
            </Typography>

            <TextField
                multiline
                maxRows={3}
                fullWidth
                value={value_}
                onChange={handleChangeValue}
                onBlur={handleBlur}
            />
        </Box>
    )
}

export default CellCardItemObs