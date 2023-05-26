import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import ButtonVerSolicitud from '../Buttons/ButtonVerSolicitud'
import { useState } from 'react';

const CardSolicitudEnCuso = () => {
    const [card, setCard] = useState(-1);
  return (
    <>
        <Card 
            sx={{ maxWidth: 316 }}
            className="pl-2"
            style={{
                // opacity: "0.80",
                // background: "#1D428A"
            }}>
            <CardContent>
            <Typography 
                gutterBottom
                component="div"
                style={{
                    color: "#1D428A",
                    fontWeight: "400",
                    fontSize:"16px",
                  }}
                >
                872767 - Apertura de Cuenta Caja de Ahorro Persona Fisica
            </Typography>
            <Typography 
                variant="body2" 
                color="text.secondary">
                1 de 6 Documentos Cargados
            </Typography>
            <div className="flex justify-end">
                <ButtonVerSolicitud onClick={() => setCard(-1)}/>
            </div>
            </CardContent>
        </Card> 
    </>
  )
}

export default CardSolicitudEnCuso