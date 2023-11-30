import React, { memo } from 'react'
import CustomModal from '../../shared/CustomModal'
import Form from './Form';
import { promissoryNotesDeliveryActions, promissoryNotesSelectors } from '../../../redux/slices/delivery.slice';
import { useDispatch, useSelector } from 'react-redux';
import DeliveryPdfViewer from './DeliveryPdfViewer';
import AttachFileDelivery from './AttachFileDelivery';

const ModalPromissoryNotesDelivery = memo(() => {
    const dispatch = useDispatch();

    const showFormModal = useSelector(promissoryNotesSelectors.getFormShowModal);
    const showPdfModal = useSelector(promissoryNotesSelectors.getPdfShowModal);
    const showAttachModal = useSelector(promissoryNotesSelectors.getAttachShowModal);
    const promissoryNotesSelected = useSelector(promissoryNotesSelectors.getPromissoryNotesConsultDelivery);
    const handleCloseFormModal = () => {
        dispatch(promissoryNotesDeliveryActions.setFormShowModal(false));
    }

    const handleClosePdfModal = () => {
        dispatch(promissoryNotesDeliveryActions.setPdfShowModal(false));
        dispatch(promissoryNotesDeliveryActions.setFormShowModal(true));
    }

    const handleClosAttachModal = () => {
        dispatch(promissoryNotesDeliveryActions.setAttachShowModal(false));
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
                disableBackdropClick
                disableEscapeKeyDown
            />
            <CustomModal
                open={showPdfModal}
                onClose={handleClosePdfModal}
                content={<DeliveryPdfViewer />}
                dialogTitleSxProps={{
                    paddingTop: 1
                }}
                fullScreen
                disableBackdropClick
                disableEscapeKeyDown
            />
            <CustomModal
                open={showAttachModal}
                onClose={handleClosAttachModal}
                content={<AttachFileDelivery />}
                dialogTitleSxProps={{
                    paddingTop: 1
                }}
                maxWidth="md"
                disableBackdropClick
                disableEscapeKeyDown
            />
        </>
    )
}
)

export default ModalPromissoryNotesDelivery