// import { useMaterialReactTable, MaterialReactTable } from 'material-react-table';
import { MRT_Cell, MRT_ColumnDef, MRT_Row, MRT_TableInstance, MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { useMemo } from 'react';
import SimpleDataTable from '../../../components/shared/DataTable/SimpleDataTable';
import { FieldsDataTable } from '../../../interfaces/_common';
import { DetailPromissotyNotesConsult } from '../../../interfaces/promissoryNotes';

interface ExampleData {
    nroEnvio: string;
    nroEnvio2: string;
    envio: string;
    envio2: string;
    operacion: string;
    operacion2: string;
    codigoCliente: string;
    codigoCliente2: string;
    nombreCliente: string;
    nombreCliente2: string;
}
const data: ExampleData[] = [];
for (let i = 1; i <= 1000; i++) {
    const newData: ExampleData = {
        nroEnvio: i.toString(),
        nroEnvio2: i.toString(),
        envio: `Envío ${i}`,
        envio2: `Envío ${i}`,
        operacion: `Operación ${i}`,
        operacion2: `Operación ${i}`,
        codigoCliente: `Código ${i}`,
        codigoCliente2: `Código ${i}`,
        nombreCliente: "Ejemplo", // Utilizando faker para nombres aleatorios
        nombreCliente2: "Ejemplo", // Utilizando faker para nombres aleatorios
    };
    data.push(newData);
}


const MaterialDataTableExample = () => {
    const columns_ = useMemo<MRT_ColumnDef<ExampleData>[]>(() => [
        {
            accessorKey: "nroEnvio",
            header: "Nro. Envío",
        },
        {
            accessorKey: "envio",
            header: "Fecha digitalización",
        },
        {
            accessorKey: "operacion",
            header: "Operación",
        },
        {
            accessorKey: "codigoCliente",
            header: "Código",
        },
        {
            accessorKey: "nombreCliente",
            header: "Cliente",
        },
    ], []);

    const table = useMaterialReactTable({
        columns: columns_,
        data: data,


        //ACTIONS
        enableColumnActions: false,

        //SORTING
        enableSorting: false,

        //PAGINATION
        enablePagination: true,

        //FILTERS
        enableFilters: false,

        //STICKY
        enableStickyHeader: true,

        //TOOLBAR
        enableTopToolbar: false,

        //I18n
        localization: MRT_Localization_ES,

        //GROUPING
        // enableGrouping: true,

        //INITIAL STATE
        initialState: {
            expanded: true, //expand all groups by default
            // grouping: ['nroEnvio'], //an array of columns to group by by default (can be multiple)
        },

        //DETAIL PANEL
        renderDetailPanel: ({ row }) => {
            //             export interface FieldsDataTable {
            //                 render ?: (row: any) => JSX.Element;
            //             key: string;
            //             label: string;
            // }
            // interface DetailPromissotyNotesConsult {
            //     fecha: string;
            //     sucursal: string;
            //     estado: string;
            //     moneda: string;
            //     observacion: string;
            //     usuario: string;
            //     sucursalDestino: string;
            // }
            const subRowsData: DetailPromissotyNotesConsult[] = [
                {
                    fecha: "2021-09-10",
                    sucursal: "Sucursal 1",
                    estado: "Estado 1",
                    moneda: "Moneda 1",
                    observacion: "Observación 1",
                    usuario: "Usuario 1",
                    sucursalDestino: "Sucursal destino 1",
                },
                {
                    fecha: "2021-09-10",
                    sucursal: "Sucursal 2",
                    estado: "Estado 2",
                    moneda: "Moneda 2",
                    observacion: "Observación 2",
                    usuario: "Usuario 2",
                    sucursalDestino: "Sucursal destino 2",
                },
                {
                    fecha: "2021-09-10",
                    sucursal: "Sucursal 3",
                    estado: "Estado 3",
                    moneda: "Moneda 3",
                    observacion: "Observación 3",
                    usuario: "Usuario 3",
                    sucursalDestino: "Sucursal destino 3",
                },
            ];
            const subRowsFields: FieldsDataTable[] = [
                {
                    key: "nroEnvio",
                    label: "Nro. Envío",
                },
                {
                    key: "envio",
                    label: "Fecha digitalización",
                },
                {
                    key: "operacion",
                    label: "Operación",
                },
                {
                    key: "codigoCliente",
                    label: "Código",
                },
                {
                    key: "nombreCliente",
                    label: "Cliente",
                },
            ];

            return (
                <SimpleDataTable data={subRowsData} columns={subRowsFields} />
            )
        },

        //MUI COMPONENTS
        muiTableHeadCellProps: {
            sx: {
                backgroundColor: "#ededef",
                color: "#373a3c",
                borderRadius: 3,
                paddingTop: 2,
                paddingBottom: 2,
                justifyContent: "center",
            },
            align: "center",
        },
        muiTableContainerProps: {
            sx: {
                maxHeight: 500
            }
        },
        muiTableBodyCellProps: {
            sx: () => ({
                border: "1px solid #ededef",
                borderRadius: 1,
                paddingTop: 2,
                paddingBottom: 2,
            }),
            align: "center",
        },
        muiTableProps: {
            sx: () => ({
                borderCollapse: "separate",
                borderSpacing: "5px",
            }),
        },
        muiTablePaperProps: {
            elevation: 0,
        },
    });

    return (
        <MaterialReactTable table={table} />
    )
}

export default MaterialDataTableExample