import { SxProps, Theme } from '@mui/material';
import React, { useMemo, useRef } from 'react';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import {
    MRT_Cell,
    MRT_ColumnDef,
    MRT_Row,
    MRT_TableInstance,
    MaterialReactTable,
    useMaterialReactTable,
    MRT_RowData,
    MRT_TableOptions
} from 'material-react-table';
import { SimpleRowSelectionState } from '../../../interfaces/_common';
import SimpleDataTable, { DataTableProps } from './SimpleDataTable';
import { OnChangeFn, ColumnDef, Updater } from "@tanstack/react-table"
import { useWindowSize } from '../../../hooks/useWindowsSize';


export interface NestedRowData<TData extends MRT_RowData> {
    subRows: TData[];
    data: TData;
}

export type OnChangeNestedFn<T, TData extends MRT_RowData> = (updaterOrValue: Updater<T>, parentRow: MRT_Row<TData>, table: MRT_TableInstance<TData>) => void;

interface CustomMaterialDataTableProps<TData extends MRT_RowData,> extends MRT_TableOptions<TData> {
    columns: MRT_ColumnDef<TData>[];
    data: TData[];
    isLoading?: boolean;
    actions?: (props: {
        cell: MRT_Cell<TData>;
        row: MRT_Row<TData>;
        table: MRT_TableInstance<TData>;
    }) => React.ReactNode;
    variant?: "normal" | "compact";
    enableNestedTable?: boolean;
    nestedFields?: ColumnDef<TData>[];
    onSubRowSelectionChange?: OnChangeNestedFn<SimpleRowSelectionState, TData>;
    subRowSelection?: SimpleRowSelectionState;
    nestedTableProps?: Partial<DataTableProps<TData>>;
}

const CustomMaterialDataTable = <TData extends MRT_RowData>({
    columns,
    data,
    isLoading = false,
    actions,
    variant = "normal",
    enableSelectAll = false,
    enableRowSelection = false,
    onRowSelectionChange,
    enableNestedTable,
    nestedFields = [],
    onSubRowSelectionChange,
    subRowSelection,
    nestedTableProps,
    ...props
}: CustomMaterialDataTableProps<TData>) => {

    const padreRef = useRef(null);
    const { getRestantHeight } = useWindowSize(padreRef);

    const sxMuiTableHeadCellProps: SxProps<Theme> = {
        backgroundColor: "#ededef",
        color: "#373a3c",
        borderRadius: variant == "normal" ? 3 : 0,
        paddingTop: variant == "normal" ? 1 : 1,
        paddingBottom: variant == "normal" ? 1 : 1,
        justifyContent: "center",
        boxShadow: "none",
        verticalAlign: "center",
        fontSize: 14,
    }

    const renderDetailPanel = enableNestedTable ? ({ row }: {
        row: MRT_Row<TData>;
        table: MRT_TableInstance<TData>;
    }) => {
        return (
            <SimpleDataTable
                columns={nestedFields}
                data={row.original.subRows} //TIENE QUE SER UN ARRAY DE OBJETOS 
                enableRowSelection={!!enableRowSelection}
                onRowSelectionChange={(updaterOrValue) => {
                    if (onSubRowSelectionChange) {
                        onSubRowSelectionChange(updaterOrValue, row, table);
                    }
                }}
                rowSelection={subRowSelection}
                variant={"nested"}
                {...nestedTableProps}
            />
        )
    } : undefined;

    //calcular el alto de la tabla partiendo del contenedor, para que no agarre toda la pantalla

    const table = useMaterialReactTable({
        //REQUIRED
        columns,
        data,

        //STATE
        state: {
            showProgressBars: isLoading,
        },

        //LAYOUT
        layoutMode: variant == "normal" ? "semantic" : "grid",

        //ACTIONS
        enableRowActions: actions ? true : false,
        renderRowActions: actions,
        enableColumnActions: false,

        //SORTING
        enableSorting: false,

        //PAGINATION
        enablePagination: false,

        //FILTERS
        enableFilters: false,

        //TOOLBARS
        enableTopToolbar: false,

        //HEADER
        // enableStickyHeader: true,

        //SELECTABLE
        enableSelectAll: enableSelectAll,
        enableRowSelection: enableRowSelection,
        onRowSelectionChange: onRowSelectionChange,

        //DETAIL PANEL
        renderDetailPanel: renderDetailPanel,

        //LOCALIZATION
        localization: MRT_Localization_ES,

        //MUI COMPONENTS

        muiTableHeadCellProps: {
            sx: sxMuiTableHeadCellProps,
            align: "center",
        },

        muiTableHeadProps: {
            sx: () => ({
                '& > tr': { borderSpacing: '0 !important' }
            })
        },

        muiTableBodyCellProps: {
            sx: () => ({
                border: "1px solid #ededef",
                borderRadius: 3,
                paddingTop: 1,
                paddingBottom: 1,
                fontSize: 14,
            }),
            align: "center",
        },

        muiTableProps: {
            sx: () => ({
                borderCollapse: "separate",
                borderSpacing: "5px",
            }),
        },

        muiTableHeadRowProps: {
            sx: () => ({
                boxShadow: "none"
            })
        },

        muiDetailPanelProps: (props) => ({
            sx: () => ({
                padding: "0px 0px 0px 0px",
                backgroundColor: "#ededef",
            })
        }),

        muiTablePaperProps: {
            elevation: 0,
            sx: () => ({
                //calcular el alto dependiendo de todo el espacio que le sobre sin scroll en mi modulo
                // height: getRestantHeight(80),

            }),
            ref: padreRef
        },

        muiTableContainerProps: {
            sx: {
                // height: getRestantHeight(80),
                // maxHeight: 500,
            }
        },

        ...props
    });

    return (
        <MaterialReactTable table={table} />
    )
}

export default CustomMaterialDataTable