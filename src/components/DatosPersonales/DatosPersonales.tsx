import { Box, Button, Grid, TextField, useMediaQuery } from '@mui/material';
import { useState } from 'react'
import { theme } from '../../../theme/Theme';
import DatosPersonalesImage from '../../assets/svg/DatosPersonalesImage.svg' 
import Image from 'next/image';
import styles from '../DatosPersonales/DatosPersonales.module.css';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { datosCliente } from '../../redux/slices/datosCliente.slice';
import { capitalizePorPalabra } from '../../helpers/capitalize';

type ClienteDatosProps = {
    imagen? : string,    
}

const paises: {[key: string]: string} = {
    "PY": "Paraguaya",
    "": ""
}

const DatosPersonales = ({imagen = DatosPersonalesImage } : ClienteDatosProps) => {
    const mediaQueryXsNumber = useMediaQuery(theme.breakpoints.down(634));
	const mediaQueryMdNumber = useMediaQuery(theme.breakpoints.down(785));
	const [estado, setEstado] = useState();
    const clienteDatos = useSelector((state: RootState) => state.clienteDatos.items);    
    const [clientDate, setClientDate] = useState<any>(null);   
    
    if (!clienteDatos || !clienteDatos.codigoCliente) return null;
    
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
                                        value={(clienteDatos?.cedula ?? "")}
                                        // ?? (clienteDocumento?.cedula ?? "")}                                        
                                        // disabled
                                        // value = {capitalize(`${datosBasicos?.primerNombre  || ''} ${datosBasicos?.segundoNombre || ''}`)}                                     
                                        />                                                                            
                                </Grid>
                                
                                <Grid item xs={12}>
                                    <TextField
                                        variant='outlined'
                                        size='small'
                                        label='Nombre y Apellido'
                                        fullWidth                                                                             
                                        value = 
                                        {(clienteDatos.primerNombre ? `${capitalizePorPalabra(`${clienteDatos?.primerNombre ?? ''}`)} ${capitalizePorPalabra(`${clienteDatos?.segundoNombre ?? ''}`)} ${clienteDatos?.primerApellido ?? ''} ${clienteDatos?.segundoApellido ?? ''}` : '')}
                                            // ?? 
                                        // (clienteDocumento.primerNombre ? `${capitalizePorPalabra(`${clienteDocumento?.primerNombre ?? ''}`)} ${capitalizePorPalabra(`${clienteDocumento?.segundoNombre ?? ''}`)} ${clienteDocumento?.primerApellido ?? ''} ${clienteDocumento?.segundoApellido ?? ''}` : '')}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant='outlined'
                                        size='small'
                                        label='Fecha de Nacimiento'
                                        name="fechaNacimiento"
                                        fullWidth
                                        value={(clienteDatos?.fechaNacimiento?.split("T")[0] ?? "")}
                                        //  ?? (clienteDocumento.fechaNacimiento ?? "")}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant='outlined'
                                        size='small'
                                        label='Nacionalidad'
                                        name="nacionalidad"
                                        fullWidth      
                                        value={(paises[clienteDatos?.pais ?? ""])}
                                        //  ?? (paises[clienteDocumento?.pais ?? ""])}                                  
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
                                        value={(capitalizePorPalabra(`${clienteDatos?.estadoCivil ?? ""}`))}
                                        //  ?? (capitalizePorPalabra(`${clienteDocumento?.estadoCivil ?? ""}`))}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant='outlined'
                                        size='small'
                                        label='Profesión'
                                        fullWidth
                                        value={(capitalizePorPalabra(`${clienteDatos?.ocupacion ?? ""}`))}
                                        //  ?? (capitalizePorPalabra(`${clienteDocumento?.ocupacion ?? ""}`))}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant='outlined'
                                        size='small'
                                        label='Suc. Cliente'
                                        fullWidth
                                        value={(capitalizePorPalabra(`${clienteDatos?.sucursal ?? ""}`))}
                                        //  ?? (capitalizePorPalabra(`${clienteDocumento?.sucursal ?? ""}`))}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant='outlined'
                                        size='small'
                                        label='Oficial'
                                        fullWidth
                                        value={(capitalizePorPalabra(`${clienteDatos?.oficial ?? ""}`))} 
                                        // ?? (capitalizePorPalabra(`${clienteDocumento?.oficial ?? ""}`))}
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