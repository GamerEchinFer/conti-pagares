import React, { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import AbiError from '../../assets/img/generales/abi3.svg';
import { Box, Fade, Modal, Typography } from "@mui/material";
import styles from './genericos/Genericos.module.css';
import { uiSetError, dataError as dataErrorReducer } from "../../redux/slices/ui/ui.slice";
import redirectsDisabled from "../../config/redirectsDisabled";
import dataErrorResponse from "../../models/responses/DataError.response";
import Image from 'next/image';

const ErrorBar = () => {
    const dispatch = useAppDispatch();
    const { dataError, msgError, modalPara } = useSelector((state: RootState) => state.ui);
    const [mostrarModal, setMostrarModal] = useState<boolean>(true);
    const [caducoSession, setCaducoSession] = useState<boolean>(false);

    useEffect(() => {
        if(dataError && dataError.codigo === 401){
            setCaducoSession(true);
        }
    }, [dataError])

    useEffect(() => {
        if(msgError && msgError.length > 0 && !modalPara){
            setMostrarModal(true);
        }
    }, [msgError])    

    const handleClose = () => {
        dispatch(uiSetError(null));
        dispatch(dataErrorReducer(null));
        setMostrarModal(false);
        if(caducoSession){
            window.location.href='/'
        }else{
            const url: string = window.location.pathname;
            const redirect: boolean = redirectsDisabled.find(e => e.path === url) ? false : true;            
            if(redirect){
                return;
            }

        };
    };

    const imgError = () => {
        let image : JSX.Element = <Image 
                                    className={styles['imageAbi']}
                                    src={AbiError}
                                    alt="" />
        let code = dataError &&  (dataError as dataErrorResponse).codigo
        if(code && code >= 401 && code <=503){
            image = <Image 
                        className={styles['imageAbi']}
                        src={ (dataError && dataError as dataErrorResponse)!.imagen }
                        alt=""
                        />
            return image;
        }
        return image;
    }

    return (
        <>
            {
                !modalPara && msgError !== null &&
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={styles['modalContenido']}
                    open={mostrarModal}
                    onClose={()=>{handleClose()}}
                    closeAfterTransition
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={mostrarModal}>
                        <div className={styles['paperModal']}>
                            <div>
                                <div style={{width: '100%'}}>
                                    <Box className={styles['boxContenedor']} >
                                        <Box style={{textAlign: 'end'}}>
                                            <CloseIcon
                                                onClick={()=>{handleClose()}}
                                                style={{cursor: 'pointer', opacity: 0.6}}
                                            />
                                        </Box>
        
                                        <Box style={{textAlign: 'center'}}>
                                            {imgError()}
                                        </Box>
        
                                        {
                                            !caducoSession && msgError === 'Por algún motivo, ocurrió un error durante el proceso. Por favor, vuelve a intentarlo' &&
                                            <Box style={{ textAlign: 'center' }}>
                                                <Typography style={{ fontSize: 25, color: '#151515' }}>
                                                    ¡Vaya! Algo no salió bien
                                                </Typography>
                                            </Box>
                                        }
        
                                        {
                                            caducoSession &&
                                            <Box style={{ textAlign: 'center' }}>
                                                <Typography style={{ fontSize: 25, color: '#151515' }}>
                                                    Consulta expirada
                                                </Typography>
                                            </Box>
                                        }
        
                                        {
                                            caducoSession &&
                                            <Box style={{ textAlign: 'center', alignSelf: 'center', width: '92%' }}>
                                                <Typography style={{ fontSize: 16, marginBottom: 10 }}>
                                                    Por seguridad, cerramos la consulta cuando pasas más de 15 minutos sin actividad. Podés volver a ingresar nuevamente.
                                                </Typography>
                                            </Box>
                                        }
        
                                        {   
                                            !caducoSession &&
                                            <Box style={{ textAlign: 'center', alignSelf: 'center', width: '90%' }}>
                                                <Typography style={{ fontSize: 18, marginBottom: 10 }}>
                                                    {msgError}
                                                </Typography>
                                            </Box>
                                        }
                                    </Box>
                                </div>
                            </div>
                        </div>
                    </Fade>
                </Modal>
            }
        </>
    )
};

export default ErrorBar;