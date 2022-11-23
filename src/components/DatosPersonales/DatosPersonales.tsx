import { Box, Button, Grid, TextField, useMediaQuery } from '@mui/material';
import { useState } from 'react'
import { theme } from '../../../theme/Theme';
import DatosPersonalesImage from '../../assets/svg/DatosPersonalesImage.svg' 
import Image from 'next/image';
import styles from '../DatosPersonales/DatosPersonales.module.css';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';

type ClienteDatosProps = {
    imagen? : string,
    primerNombre: string,
    setIdPrimerNombre: any
}

const DatosPersonales = ({imagen = DatosPersonalesImage, primerNombre, setIdPrimerNombre } : ClienteDatosProps) => {
    const mediaQueryXsNumber = useMediaQuery(theme.breakpoints.down(634));
	const mediaQueryMdNumber = useMediaQuery(theme.breakpoints.down(785));
	const [estado, setEstado] = useState();
    const clienteDatos = useSelector((state: RootState) => state.clienteDatos.items);
    const [clientDate, setClientDate] = useState<any>(null);
    const axios = require('axios');

    async function getClienteDatos(codigoCliente: string) {
        const config = {
            headers: {
                'Subscription-Key': '578a3e189d3a4da791ad1aa2a00bae3c',
                'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJkcXg3bWhXTEwyQW9OOHBfWGd6cG5iajRhMzFySDV1Um5Ua0Fld2k2ZjFnIn0.eyJleHAiOjE2NjkyMjMyNTAsImlhdCI6MTY2OTIyMjk1MCwianRpIjoiNzAyZGM1ZGEtZjFjMC00ZDA0LTk5NTEtMzc5YmEzNTg5MGI0IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay1xYS5iYW5jb250aW5lbnRhbC5jb20ucHkvYXV0aC9yZWFsbXMvaW50ZXJubyIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJlNjBmM2ZjNi00ZTc0LTQ3OWYtYTU1Yy05OWM1MTIwZTc2N2EiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJnZXN0aW9uLWRvY3VtZW50YWwiLCJhY3IiOiIxIiwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtaW50ZXJubyIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImNsaWVudElkIjoiZ2VzdGlvbi1kb2N1bWVudGFsIiwiY2xpZW50SG9zdCI6IjEwLjM2LjAuMCIsInByZWZlcnJlZF91c2VybmFtZSI6InNlcnZpY2UtYWNjb3VudC1nZXN0aW9uLWRvY3VtZW50YWwiLCJjbGllbnRBZGRyZXNzIjoiMTAuMzYuMC4wIn0.Sd19rbYdrlte2aEUUQPu6B8lBu9s_bPAtmR1d5UlWXmIPe7z3dc1l1vu2b06kSWxt-5_ub6HVX8emprQG7cbdvpMrdIJkZy8VubsK52eIHc0qTVROZWXNtmS7IJDLt-j0JOigT-ydspqXpjJ9uRr0u9nZVOX9kipP7vZlk6uNYdRFu94wvktQflW6aIYZ1qxMg6tJlcoS8nN1S2AfrgUqrXqvYZFuQeaV-QtDF0ulPvAuZ8iJ0bCtcM6_8bWOBd1u6yTYo1cUpsSVFnd9gPjVW0HPVyw4V_wX-8NLwbet8khruVGPA1TvtxrB9zOYAJUGUFBukN-DocmwPdNf7L-tw', 
            }
        }
        try {
          const response = await axios.get(`https://api-sandbox.bancontinental.com.py/interno/clientes/datos/v1/clientes/${codigoCliente}`, config);
          setClientDate(response.data);
          return response;
        } catch (error) {
            console.error(error);
        }
    }
    
    return (
        <>  
        {/* <pre>{JSON.stringify(clienteDatos)}</pre> */}
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
                                {/* <Button onClick={() => getClienteDatos('963013')} >Click</Button> */}
                                <Grid item xs={12}>
                                    <TextField
                                        variant='outlined'
                                        size='small'
                                        label='Nro Documento'
                                        fullWidth
                                        // disabled
                                        // value = {capitalize(`${datosBasicos?.primerNombre  || ''} ${datosBasicos?.segundoNombre || ''}`)}
                                        // autoComplete={'undefined'}
                                        value={primerNombre}
                                        onChange={(item) => {
                                            setIdPrimerNombre(String(item.target?.value ?? ""))
                                        }}
                                        />
                                        { Object.values(clienteDatos).map((value, index) => {
                                            return (
                                                <div key={index}>
                                                <h2> {value}</h2>
                                            </div>
                                            );
                                        })
                                    }
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