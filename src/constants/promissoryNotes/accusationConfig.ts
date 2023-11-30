import { EFilterControlsTypes, ESelectFilterControlType, FilterControlsItem } from "../../interfaces/components/filterControls";


export const promissoryNotesAccusationFilters: FilterControlsItem[] = [
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
        ]
    },
    {
        label: "Filtro de fecha",
        type: EFilterControlsTypes.DateRange,
        control: []
    },
];

export const ID_PRODUCTO_PROMISSORY_NOTES = 8;
export const ID_SUB_PRODUCTO_PROMISSORY_NOTES = 8;
export const ID_TIPO_DOCUMENTO_PROMISSORY_NOTES = 8;