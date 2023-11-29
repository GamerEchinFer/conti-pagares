import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import React from 'react'
import InfoLabel from '../../shared/form/InfoLabel'
import DetailDataTable from './DetailDataTable'
import DeliveryComment from './DeliveryComment'
import { PromissoryNotesConsult } from '../../../models/responses/promissoryNotes'
import { EPromissoryNotesStatus, PromissoryNotesStatusHistory } from '../../../interfaces/promissoryNotes'

interface FormProps {
    promissoryNotesConsult: PromissoryNotesConsult | null;
}
const Form = ({ promissoryNotesConsult }: FormProps) => {
    const statusHistory: PromissoryNotesStatusHistory[] = [];

    const keys = Object.keys(promissoryNotesConsult ?? {});
    if (keys.length > 0) {
        keys.forEach(item => {
            if (item == EPromissoryNotesStatus.Request && promissoryNotesConsult?.solicitud?.fechaSolicitud) {
                statusHistory.push({
                    branch: promissoryNotesConsult?.solicitud?.nombreSucursal ?? "",
                    status: EPromissoryNotesStatus.Request,
                    createdAt: promissoryNotesConsult?.solicitud?.fechaSolicitud ?? "",
                    area: promissoryNotesConsult?.solicitud?.areaSolicitud ?? "",
                    user: promissoryNotesConsult?.solicitud?.nombreUsuario ?? "",
                })
            }
            if (item == EPromissoryNotesStatus.Reception && promissoryNotesConsult?.recepcion?.fechaRecepcion) {
                statusHistory.push({
                    branch: "",
                    status: EPromissoryNotesStatus.Reception,
                    createdAt: promissoryNotesConsult?.recepcion?.fechaRecepcion ?? "",
                    area: promissoryNotesConsult?.recepcion?.areaRecepcion ?? "",
                    user: promissoryNotesConsult?.recepcion?.nombreUsuario ?? "",
                })
            }
            if (item == EPromissoryNotesStatus.Shipment && promissoryNotesConsult?.envio?.fechaEnvio) {
                statusHistory.push({
                    status: EPromissoryNotesStatus.Shipment,
                    createdAt: promissoryNotesConsult?.envio?.fechaEnvio ?? "",
                    area: promissoryNotesConsult?.envio?.areaEnvio ?? "",
                    user: promissoryNotesConsult?.envio?.nombreUsuario ?? "",
                })
            }
            if (item == EPromissoryNotesStatus.Return && promissoryNotesConsult?.devolucion?.fechaDevolucion) {
                statusHistory.push({
                    status: EPromissoryNotesStatus.Return,
                    createdAt: promissoryNotesConsult?.devolucion?.fechaDevolucion ?? "",
                    user: promissoryNotesConsult?.devolucion?.nombreUsuario ?? "",
                })
            }
            if (item == EPromissoryNotesStatus.ReceptionCust && promissoryNotesConsult?.recepcionCustodia?.fechaRecepcionCustodia) {
                statusHistory.push({
                    status: EPromissoryNotesStatus.ReceptionCust,
                    createdAt: promissoryNotesConsult?.recepcionCustodia?.fechaRecepcionCustodia ?? "",
                    user: promissoryNotesConsult?.recepcionCustodia?.nombreUsuario ?? "",
                })
            }
            if (item == EPromissoryNotesStatus.Reject && promissoryNotesConsult?.rechazo?.fechaRechazo) {
                statusHistory.push({
                    status: EPromissoryNotesStatus.Reject,
                    createdAt: promissoryNotesConsult?.rechazo?.fechaRechazo ?? "",
                    user: promissoryNotesConsult?.rechazo?.nombreUsuario ?? "",
                })
            }
            if (item == EPromissoryNotesStatus.Delivery && promissoryNotesConsult?.entrega?.fechaEntrega) {
                statusHistory.push({
                    status: EPromissoryNotesStatus.Delivery,
                    createdAt: promissoryNotesConsult?.entrega?.fechaEntrega ?? "",
                    user: promissoryNotesConsult?.entrega?.nombreUsuario ?? "",
                })
            }
        });
    }
    
    console.log(promissoryNotesConsult)
    return (
        <Stack
            spacing={3}
        >
            <InfoLabel label='Cliente' value={promissoryNotesConsult?.cliente?.nombreCliente ?? ""} />

            <Box sx={{
                display: "flex",
                gap: 5
            }}>
                <InfoLabel label='Operacion' value={promissoryNotesConsult?.operacion ?? ""} />

                <InfoLabel label='Cuota' value={promissoryNotesConsult?.cuota ?? ""} />

                <InfoLabel label='Nro Operación' value={"NO DEFINIDO"} />
            </Box>

            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1
            }}>
                <DetailDataTable promissoryNotesStatusHistory={statusHistory} />
            </Box>

            {/* <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1
            }}>
                <DeliveryComment content={promissoryNotesConsult?.observacion ?? ""} />
            </Box> */}

        </Stack>
    )
}

export default Form