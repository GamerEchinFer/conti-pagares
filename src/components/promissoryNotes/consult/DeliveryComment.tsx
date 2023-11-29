import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import React from 'react'

interface DeliveryCommentProps {
    content: string;
}
const DeliveryComment = ({ content }: DeliveryCommentProps) => {
    return (
        <>
            <Typography fontWeight={"bold"}>Comentario de entrega</Typography>
            <Box sx={{
                backgroundColor: "#ededef",
                padding: 2,
                borderRadius: 2,
            }}>
                {content}
            </Box>
        </>
    )
}

export default DeliveryComment;