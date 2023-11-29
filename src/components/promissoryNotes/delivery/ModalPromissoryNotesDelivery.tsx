import React, { memo, useState } from 'react'
import CustomModal from '../../shared/CustomModal'
import Form from './Form';
import FormActions from './FormActions';
import { PromissoryNotesConsultDelivery } from '../../../interfaces/promissoryNotes';
import { PDFViewer } from '@react-pdf/renderer';
import PromissoryNotesDeliveryPdf from './DeliveryPdf';
import { promissoryNotesDeliveryActions, promissoryNotesSelectors } from '../../../redux/slices/delivery.slice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

const ModalPromissoryNotesDelivery = memo(() => {
    const dispatch = useDispatch();
    const { usuarioKeycloack: currentUser } = useSelector((state: RootState) => state.auth);
    const showFormModal = useSelector(promissoryNotesSelectors.getFormShowModal);
    const showPdfModal = useSelector(promissoryNotesSelectors.getPdfShowModal);
    const promissoryNotesSelected = useSelector(promissoryNotesSelectors.getPromissoryNotesConsultDelivery);
    const handleCloseFormModal = () => {
        dispatch(promissoryNotesDeliveryActions.setFormShowModal(false));
    }

    const handleClosePdfModal = () => {
        dispatch(promissoryNotesDeliveryActions.setPdfShowModal(false));
        dispatch(promissoryNotesDeliveryActions.setFormShowModal(true));
    }

    return (
        <>
            <CustomModal
                open={showFormModal}
                onClose={handleCloseFormModal}
                title={"Detalles del pagaré"}
                content={<Form promissoryNotesSelected={promissoryNotesSelected} />}
                maxWidth="lg"
            />
            <CustomModal
                open={showPdfModal}
                onClose={handleClosePdfModal}
                content={<>
                    <PDFViewer
                        width={"100%"}
                        height={"100%"}
                    >
                        <PromissoryNotesDeliveryPdf 
                            promissoryNotesSelected={promissoryNotesSelected} 
                            currentUser={currentUser}
                        />
                    </PDFViewer>
                </>}
                dialogTitleSxProps={{
                    paddingTop: 1
                }}
                fullScreen
            />
        </>
    )
}
)

export default ModalPromissoryNotesDelivery