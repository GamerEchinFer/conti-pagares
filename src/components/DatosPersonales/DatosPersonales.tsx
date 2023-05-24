import { Box, Grid, TextField, useMediaQuery } from '@mui/material';
import { theme } from '../../../theme/Theme';
import DatosPersonalesImage from '../../assets/svg/DatosPersonalesImage.svg' 
import Image from 'next/image';
import styles from '../DatosPersonales/DatosPersonales.module.css';
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { capitalizePorPalabra } from '../../helpers/capitalize';
import NextButtonTB from '../Buttons/NextButtonTB';
import { solicitudActions } from '../../redux/slices/solicitud.slice';
import router from 'next/router';

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
    const clienteDatos = useSelector((state: RootState) => state.clienteDatos.items);    
    const dispatch = useDispatch(); 
    
    if (!clienteDatos || !clienteDatos.codigoCliente) return null;

    const handleClickNext = () => {
        dispatch(solicitudActions.setPage(-1))
        router.push('/solicitud');
      };
    
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
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant='outlined'
                                        size='small'
                                        label='Profesión'
                                        fullWidth
                                        value={(capitalizePorPalabra(`${clienteDatos?.ocupacion ?? ""}`))}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant='outlined'
                                        size='small'
                                        label='Suc. Cliente'
                                        fullWidth
                                        value={(capitalizePorPalabra(`${clienteDatos?.sucursal ?? ""}`))}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant='outlined'
                                        size='small'
                                        label='Oficial'
                                        fullWidth
                                        value={(capitalizePorPalabra(`${clienteDatos?.oficial ?? ""}`))} 
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
        <div className="flex flex-row justify-center gap-8 pb-8">
            <NextButtonTB disabled={!clienteDatos || !clienteDatos.codigoCliente} onClick={handleClickNext} />
        </div>
    </>
  )
}

export default DatosPersonales

