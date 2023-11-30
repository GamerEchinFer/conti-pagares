import React, { memo } from 'react'
import DragDropComponent from '../../SubirDocumentos/DragDropComponent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import { hadoopDirectoSelectors } from '../../../redux/slices/hadoop.slice';
import { useDocumento } from '../../../hooks/useDocumento';
import { promissoryNotesDeliveryActions, promissoryNotesSelectors } from '../../../redux/slices/delivery.slice';
import { CircularProgress } from '@mui/material';
import { errorNotify } from '../../../helpers/notify';

const AttachFileDelivery = memo(() => {
    const dispatch = useDispatch();
    const files = useSelector(hadoopDirectoSelectors.selectFiles);
    const promissoryNotesSelected = useSelector(promissoryNotesSelectors.getPromissoryNotesForm);
    const isSending = useSelector(promissoryNotesSelectors.getSending);
    const documento = useDocumento();

    const handleClickCargar = async () => {
        const filesArray = Object.values(files);
        const filesArrayFiltered = filesArray.filter((item: any) => item?.name?.includes(".pdf"));
        if (filesArrayFiltered.length === 0) {
            errorNotify("Debe seleccionar al menos un archivo");
            return;
        }

        const codClient = promissoryNotesSelected[0]?.cliente.codigoCliente;
        const operacion = promissoryNotesSelected[0]?.operacion;
        dispatch(promissoryNotesDeliveryActions.setSending(true));
        try {
            await documento.guardarDocumento(new Date(), operacion, codClient);
            dispatch(promissoryNotesDeliveryActions.setDigitalizadoCompleto(true));
        } catch (error) {
            errorNotify("Error al guardar el documento");
        }
        dispatch(promissoryNotesDeliveryActions.setSending(false));
    };

    const handleClickCancel = () => {
        dispatch(promissoryNotesDeliveryActions.setAttachShowModal(false));
        dispatch(promissoryNotesDeliveryActions.setFormShowModal(true));
    };


    return (
        <Stack
            spacing={1}
            sx={{
                width: 600,
            }}
        >
            <DragDropComponent />
            <Box sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2
            }}>
                <Button
                    variant='outlined'
                    onClick={handleClickCancel}
                    disabled={isSending}
                >
                    Cancelar
                </Button>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={handleClickCargar}
                    startIcon={isSending ? <CircularProgress color={"inherit"} size={20} /> : null} disabled={isSending}
                >
                    Enviar
                </Button>

            </Box>
        </Stack>
    )
});

export default AttachFileDelivery