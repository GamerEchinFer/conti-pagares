import { Box, Typography } from '@mui/material'
import React from 'react'
import styles from './InicioComponent.module.css';

const InicioComponent = () => {
  return (
    <>
      <Box className={styles.contenedor}>
        <Box sx={{ alignSelf:"center"}}>
          <Box sx={{ width:"100%"}}>
            <Typography className={styles.texto}></Typography>
          </Box>
        </Box>   
      </Box>
    </>
  )
}

export default InicioComponent