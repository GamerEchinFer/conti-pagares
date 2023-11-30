import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import React from 'react'

interface CellCardItemProps {
    label?: string;
    value?: string;
}
const CellCardItem = ({ label, value }: CellCardItemProps) => {
    return (
        <Box display={"flex"} flexDirection={"column"}>
            <Typography sx={{ fontSize: 14, fontWeight: "bold" }} color="text.primary" gutterBottom>
                {label != "" ? label : ""}
            </Typography>
            <Typography sx={{ fontSize: 14, fontWeight: "bold" }} color="text.secondary" gutterBottom>
                {value != "" ? value : ""}
            </Typography>
        </Box>
    )
}

export default CellCardItem