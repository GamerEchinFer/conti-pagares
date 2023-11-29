import React from 'react'
import Grid from '@mui/material/Unstable_Grid2/Grid2'

interface CellBodyDeliveryProps {
    xs: number;
}
const CellBodyDelivery = ({ xs }: CellBodyDeliveryProps) => {
    return (
        <Grid
            xs={xs}
            sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
            }}
        >
        </Grid>
    )
}

export default CellBodyDelivery;