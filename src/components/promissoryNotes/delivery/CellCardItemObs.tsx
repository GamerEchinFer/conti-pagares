import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { TextField } from '@mui/material';

interface CellCardItemProps {
    label?: string;
    value: string;
}
const CellCardItemObs = ({ label, value }: CellCardItemProps) => {
    const [value_, setValue_] = useState(value);
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
                onChange={(e) => setValue_(e.target.value)}
            />
        </Box>
    )
}

export default CellCardItemObs