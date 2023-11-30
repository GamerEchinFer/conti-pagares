import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { memo, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { promissoryNotesDeliveryActions, promissoryNotesSelectors } from '../../../redux/slices/delivery.slice';

interface InputObsGeneralProps {
    label?: string;
    value?: string;
}
const InputObsGeneral = memo(({ label, value }: InputObsGeneralProps) => {
    const dispatch = useDispatch();
    const obsGeneral = useSelector((state: RootState) => promissoryNotesSelectors.getPromissoryNoteObservation(state));
    const [value_, setValue_] = useState(value ?? obsGeneral ?? "");
    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue_(e.target.value);
    }

    const handleBlur = () => {
        if (value === undefined) {
            dispatch(promissoryNotesDeliveryActions.setPromissoryNoteObservation(value_));
        }
    }

    useEffect(() => {
        setValue_(value ?? obsGeneral ?? "");
    }, [value, obsGeneral]);

    return (
        <Box display={"flex"} flexDirection={"column"}>
            <Typography fontWeight={"bold"}>
                {label != "" ? label : ""}
            </Typography>

            <TextField
                multiline
                // maxRows={3}
                rows={3}
                fullWidth
                value={value_ ?? obsGeneral ?? ""}
                onChange={handleChangeValue}
                onBlur={handleBlur}
            />
        </Box>
    )
});

export default InputObsGeneral