import { EFilterControlsTypes, ERadioFilterControlType, ESelectFilterControlType, FilterControlsItem } from "../../interfaces/components/filterControls";


export const promissoryNotesConsultFilters: FilterControlsItem[] = [
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
    },
    {
        label: "Filtro de fecha",
        key: "fecha",
        type: EFilterControlsTypes.DateRange,
        control: []
    },
    {
        label: "Cuota",
        key: "cuota",
        type: EFilterControlsTypes.TextField,
        control: []
    },
];