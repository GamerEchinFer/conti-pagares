import { Box, Typography } from '@mui/material'
import React from 'react'
import styles from './InicioComponent.module.css';
import GDITitulosComponent from '../TituloySubtitulo/GDITitulosComponent';

const InicioComponent = () => {
  return (
    <>
      <Box className={styles.contenedor}>
        <Box sx={{ alignSelf:"center"}}>
          <Box sx={{ width:"100%"}} className="flex justify-center">
            <GDITitulosComponent />
          </Box>
        </Box>   
      </Box>
    </>
  )
}

export default InicioComponent