import {
    EFilterControlsTypes,
    ESelectFilterControlType,
    FilterControlsItem
} from "../../interfaces/components/filterControls";
import { PromissoryNotesConsultDelivery, PromissoryNotesDeliveryPdfColumns } from "../../interfaces/promissoryNotes";


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
