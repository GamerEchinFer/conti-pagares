import { HeaderExportMapper } from "../../interfaces/_common";
import {
    EFilterControlsTypes,
    ESelectFilterControlType,
    FilterControlsItem
} from "../../interfaces/components/filterControls";
import { PromissoryNotesConsultDelivery, PromissoryNotesDeliveryPdfColumns } from "../../interfaces/promissoryNotes";
import { PromissoryNotesConsult } from "../../models/responses/promissoryNotes";


export const promissoryNotesDeliveryFilters: FilterControlsItem[] = [
    {
        label: "Búsqueda por",
        type: EFilterControlsTypes.Select,
        control: [
            {
                type: ESelectFilterControlType.Text,
                key: "codClient",
                label: "Código de Cliente",
            },
            {
                type: ESelectFilterControlType.Text,
                key: "nroDocumento",
                label: "Nro. de documento",
            },
            {
                type: ESelectFilterControlType.Text,
                key: "operacion",
                label: "Operación",
            },
        ]
    }
];

export const promissoryNotesDeliveryPdfColumns: PromissoryNotesDeliveryPdfColumns[] = [
    {
        label: "Cliente Nro.",
        width: 10,
    },
    {
        label: "Nombre del Cliente",
        width: 20,
    },
    {
        label: "Operación Nro.",
        width: 14,
    },
    {
        label: "Monto",
        width: 10,
    },
    {
        label: "Cuota",
        width: 8,
    },
    {
        label: "Estado",
        width: 10,
    },
    {
        label: "Observación",
        width: 33,
    },
];


export const headerExportMapperPromissoryNotesDeliver: HeaderExportMapper<PromissoryNotesConsult>[] = [
    { header: "Operación", accessorFn: (row: PromissoryNotesConsult) => row.operacion },
    { header: "Cuota", accessorFn: (row: PromissoryNotesConsult) => row.cuota },
    { header: "Estado", accessorFn: (row: PromissoryNotesConsult) => row.estado },
    { header: "Nro. Envío", accessorFn: (row: PromissoryNotesConsult) => row.numeroEnvio },
    { header: "Código", accessorFn: (row: PromissoryNotesConsult) => row.cliente.codigoCliente },
    { header: "Nro Documento", accessorFn: (row: PromissoryNotesConsult) => row.cliente.codigoCliente },
    { header: "Cliente", accessorFn: (row: PromissoryNotesConsult) => row.cliente.nombreCliente },
    { header: "Observación", accessorFn: (row: PromissoryNotesConsult) => row.observacion },
    { header: "Fecha", accessorFn: (row: PromissoryNotesConsult) => row.fechaVencimiento },
];