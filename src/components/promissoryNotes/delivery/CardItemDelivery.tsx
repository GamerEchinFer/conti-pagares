// import { Card, CardContent, Typography, CardActions, Button } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import React from 'react'
import { PromissoryNotesItemCard } from '../../../interfaces/promissoryNotes'
import CellCardItem from './CellCardItem'
import CellCardItemObs from './CellCardItemObs'
import { styled } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2';
import { PromissoryNotesConsult } from '../../../models/responses/promissoryNotes'

const CardStyled = styled(Card)(({ theme }) => ({
    width: "100%",
    display: "flex",
    flexDirection: "row",
    "&.MuiCardContent-root": {
        padding: 0,
    }
}));

interface CardItemDelivery {
    id: string;
    item: PromissoryNotesConsult
}
const CardItemDelivery = ({ id, item }: CardItemDelivery) => {
    return (
        <Card elevation={3}>
            <CardContent>
                <Grid container>
                    <Grid container xs={12}>
                        <Grid xs={2}>
                            <CellCardItem label='Nro Envío' />
                        </Grid>
                        <Grid xs={2}>
                            <CellCardItem label='Nro Operación' />
                        </Grid>
                        <Grid xs={2}>
                            <CellCardItem label='Fecha' />
                        </Grid>
                        <Grid xs={6}>
                            <CellCardItem label='Obs' />
                        </Grid>
                    </Grid>
                    <Grid container xs={12}>
                        <Grid xs={2}>
                            <CellCardItem value={item.numeroEnvio} />
                        </Grid>
                        <Grid xs={2}>
                            <CellCardItem value={item.operacion} />
                        </Grid>
                        <Grid xs={2}>
                            <CellCardItem value={item.fechaVencimiento} />
                        </Grid>
                        <Grid xs={6}>
                            <CellCardItemObs id={id} />
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default CardItemDelivery