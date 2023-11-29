// import { Card, CardContent, Typography, CardActions, Button } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import React from 'react'
import { PromissoryNotesItemCard } from '../../../interfaces/promissoryNotes'
import CellCardItem from './CellCardItem'
import CellCardItemObs from './CellCardItemObs'
import { styled } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2';

const CardStyled = styled(Card)(({ theme }) => ({
    width: "100%",
    display: "flex",
    flexDirection: "row",
    "&.MuiCardContent-root": {
        padding: 0,
    }
}));

interface CardItemDelivery {
    item: PromissoryNotesItemCard
}
const CardItemDelivery = ({ item }: CardItemDelivery) => {
    return (
        <Card elevation={3}>
            <CardContent>
                <Grid container>
                    <Grid container xs={12}>
                        <Grid xs={2}>
                            <CellCardItem label='Nro Envío' value={""} />
                        </Grid>
                        <Grid xs={2}>
                            <CellCardItem label='Nro Operación' value={""} />
                        </Grid>
                        <Grid xs={2}>
                            <CellCardItem label='Fecha' value={""} />
                        </Grid>
                        <Grid xs={6}>
                            <CellCardItem label='Obs' value={""} />
                        </Grid>
                    </Grid>
                    <Grid container xs={12}>
                        <Grid xs={2}>
                            <CellCardItem label={""} value={item.nroEnvio} />
                        </Grid>
                        <Grid xs={2}>
                            <CellCardItem label={""} value={item.operacion} />
                        </Grid>
                        <Grid xs={2}>
                            <CellCardItem label={""} value={item.fecha} />
                        </Grid>
                        <Grid xs={6}>
                            <CellCardItemObs label={""} value={item.observacion} />
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default CardItemDelivery