import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react'

interface InputObsGeneralProps {
    label?: string;
    value: string;
}
const InputObsGeneral = ({ label, value }: InputObsGeneralProps) => {
    const [value_, setValue_] = useState(value);
    return (
        <Box display={"flex"} flexDirection={"column"}>
            <Typography fontWeight={"bold"}>
                {label != "" ? label : ""}
            </Typography>

            <TextField
                multiline
                maxRows={3}
                rows={3}
                fullWidth
                value={value_}
                onChange={(e) => setValue_(e.target.value)}
            />
        </Box>
    )
}

export default InputObsGeneral