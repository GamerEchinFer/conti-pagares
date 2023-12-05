import { PromissoryNotesStatusHistory, EPromissoryNotesStatus } from "../interfaces/promissoryNotes";
import { PromissoryNotesConsult } from "../models/responses/promissoryNotes";

const getRowId = (row: PromissoryNotesConsult) => {
    return `${row.operacion}_${row.cliente.codigoCliente}_${row.cuota}`;
};

const findByRowId = (rows: PromissoryNotesConsult[], rowId: string) => {
    const [operacion, codigoCliente, cuota] = rowId.split('_');

    return rows.find(row => {
        return row.operacion === operacion && row.cliente.codigoCliente === codigoCliente && row.cuota === cuota;
    });
}

const generateStatusHistory = (promissoryNotesConsult: PromissoryNotesConsult) => {
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

    return statusHistory;
}

export const promissoryNotesHelper = {
    getRowId,
    findByRowId,
    generateStatusHistory,
}