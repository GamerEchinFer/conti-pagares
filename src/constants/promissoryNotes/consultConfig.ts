import { HeaderExportMapper } from "../../interfaces/_common";
import { EFilterControlsTypes, ERadioFilterControlType, ESelectFilterControlType, FilterControlsItem } from "../../interfaces/components/filterControls";
import { PromissoryNotesConsult } from "../../models/responses/promissoryNotes";


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

// { accessorKey: "operacion", header: "Operación", size: 50 },
// { accessorKey: "cuota", header: "Cuota", size: 50 },
// { accessorKey: "estado", header: "Estado", size: 50 },
// { accessorKey: "numeroEnvio", header: "Nro. Envío", size: 50 },
// {
//     accessorKey: "codigoCliente",
//     accessorFn: (originalRow) => {
//         console.log(originalRow)
//         const codcliente = originalRow.cliente.codigoCliente as string;
//         return codcliente.substring(0, 6)
//     },
//     header: "Código", size: 50
// },
// { accessorKey: "cliente.codigoCliente", header: "Nro Documento", size: 50 },
// { accessorKey: "cliente.nombreCliente", header: "Cliente", size: 50 },
// { accessorKey: "observacion", header: "Observación", size: 50 },
// { accessorKey: "envio.fechaEnvio", header: "Fecha", size: 50 },

export const headerExportMapperPromissoryNotesConsult: HeaderExportMapper<PromissoryNotesConsult>[] = [
    { header: "Operación", accessorFn: (row: PromissoryNotesConsult) => row.operacion },
    { header: "Cuota", accessorFn: (row: PromissoryNotesConsult) => row.cuota },
    { header: "Estado", accessorFn: (row: PromissoryNotesConsult) => row.estado },
    { header: "Nro. Envío", accessorFn: (row: PromissoryNotesConsult) => row.numeroEnvio },
    { header: "Código", accessorFn: (row: PromissoryNotesConsult) => row.cliente.codigoCliente },
    { header: "Nro Documento", accessorFn: (row: PromissoryNotesConsult) => row.cliente.codigoCliente },
    { header: "Cliente", accessorFn: (row: PromissoryNotesConsult) => row.cliente.nombreCliente },
    { header: "Observación", accessorFn: (row: PromissoryNotesConsult) => row.observacion },
    { header: "Fecha", accessorFn: (row: PromissoryNotesConsult) => row.fechaVencimiento },
]
