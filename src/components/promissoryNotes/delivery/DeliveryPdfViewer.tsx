import { PDFViewer } from '@react-pdf/renderer'
import React, { memo } from 'react'
import PromissoryNotesDeliveryPdf from './DeliveryPdf'
import { promissoryNotesSelectors } from '../../../redux/slices/delivery.slice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

const DeliveryPdfViewer = memo(() => {
    console.log("renderizado DeliveryPdfViewer");
    const promissoryNotesSelected = useSelector(promissoryNotesSelectors.getPromissoryNotesForm);
    const promissoryObservation = useSelector(promissoryNotesSelectors.getPromissoryNoteObservation);
    const { usuarioKeycloack: currentUser } = useSelector((state: RootState) => state.auth);
    return (
        <PDFViewer
            width={"100%"}
            height={"100%"}
        >
            <PromissoryNotesDeliveryPdf
                promissoryNotesSelected={promissoryNotesSelected}
                currentUser={currentUser}
                obsGeneral={promissoryObservation}
            />
        </PDFViewer>
    )
});

export default DeliveryPdfViewer