import { Box, Grid, TextField, useMediaQuery } from '@mui/material';
import React from 'react'
import { theme } from '../../../theme/Theme';
import DatosPersonalesImage from '../../assets/svg/DatosPersonalesImage.svg' 
import Image from 'next/image';
import styles from '../DatosPersonales/DatosPersonales.module.css';

type props = {
    imagen? : string;
}

const DatosPersonales = ({imagen = DatosPersonalesImage } : props) => {
    const mediaQueryXsNumber = useMediaQuery(theme.breakpoints.down(634));
	const mediaQueryMdNumber = useMediaQuery(theme.breakpoints.down(785));
	
  return (
    <>
        <Grid container pt={3} pb={'2px'} style={{ justifyContent: 'center' }}>
			<Box className={styles.box}>
                <Grid container>  
                    <Grid container spacing={'20px'} style={{ paddingRight: mediaQueryMdNumber ? 25 : 0 }} className={styles['container-inside-box']} >
                        <Grid item xs={mediaQueryXsNumber ? 12 : 6} md={6}>
                            <Grid item xs={12} mb={2}>
                                    <div className="datosPersonales flex" >
                                <Image src={imagen}  alt='datosPersonales' />
                                        <span className="pl-4">Datos personales</span>
                                    </div>
                                <div className="">
                                </div>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        variant='outlined'
                                        size='small'
                                        label='Nro Documento'
                                        fullWidth
                                        // disabled
                                        // value = {capitalize(`${datosBasicos?.primerNombre  || ''} ${datosBasicos?.segundoNombre || ''}`)}
                                        // autoComplete={'undefined'}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant='outlined'
                                        size='small'
                                        label='Nombre y Apellido'
                                        fullWidth
                                        // disabled
                                        // value={capitalize(`${datosBasicos?.primerApellido || ''} ${datosBasicos?.segundoNombre ||''}`)}
                                        // autoComplete={'undefined'}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant='outlined'
                                        size='small'
                                        label='Fecha de Nacimiento'
                                        name="email"
                                        fullWidth
                                        // value={formik.values.email}
                                        // autoComplete={'undefined'}
                                        // onChange={(e) => {
                                        //     formik.handleChange(e);
                                        // }}

                                        // error={formik.errors.email && formik.touched.email ? true : false}
                                        // helperText={formik.errors.email && formik.touched.email ? formik.errors.email : ''}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant='outlined'
                                        size='small'
                                        label='Nacionalidad'
                                        name="email"
                                        fullWidth
                                        // value={formik.values.email}
                                        // autoComplete={'undefined'}
                                        // onChange={(e) => {
                                        //     formik.handleChange(e);
                                        // }}

                                        // error={formik.errors.email && formik.touched.email ? true : false}
                                        // helperText={formik.errors.email && formik.touched.email ? formik.errors.email : ''}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={mediaQueryXsNumber ? 12 : 6} md={6}>
                        <Grid item xs={12} mb={2}>
                            <div className="pb-9"></div>
                        </Grid>
                        <Grid container spacing={2}>
                    <Grid item xs={12}>
                                <TextField
                                    variant='outlined'
                                    size='small'
                                    label='Estado Civil'
                                    fullWidth
                                    // disabled
                                    // value = {capitalize(`${datosBasicos?.primerNombre  || ''} ${datosBasicos?.segundoNombre || ''}`)}
                                    // autoComplete={'undefined'}
                                />
                    </Grid>
                    <Grid item xs={12}>
                                <TextField
                                    variant='outlined'
                                    size='small'
                                    label='Profesión'
                                    fullWidth
                                    // disabled
                                    // value = {capitalize(`${datosBasicos?.primerNombre  || ''} ${datosBasicos?.segundoNombre || ''}`)}
                                    // autoComplete={'undefined'}
                                />
                    </Grid>
                    <Grid item xs={12}>
                                <TextField
                                    variant='outlined'
                                    size='small'
                                    label='Suc. Cliente'
                                    fullWidth
                                    // disabled
                                    // value = {capitalize(`${datosBasicos?.primerNombre  || ''} ${datosBasicos?.segundoNombre || ''}`)}
                                    // autoComplete={'undefined'}
                                />
                    </Grid>
                    <Grid item xs={12}>
                                <TextField
                                    variant='outlined'
                                    size='small'
                                    label='Oficial'
                                    fullWidth
                                    // disabled
                                    // value = {capitalize(`${datosBasicos?.primerNombre  || ''} ${datosBasicos?.segundoNombre || ''}`)}
                                    // autoComplete={'undefined'}
                                />
                    </Grid>
                    </Grid>
                    </Grid>
                </Grid>
            </Grid>
            </Box>
        </Grid>
    </>
  )
}

export default DatosPersonales