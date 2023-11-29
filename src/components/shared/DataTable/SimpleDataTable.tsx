import Box from "@mui/material/Box"
import TableBody from "@mui/material/TableBody"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { CircularProgress } from '@mui/material';
import { SimpleRowData, SimpleRowSelectionState } from "../../../interfaces/_common"
import { OnChangeFn, Row } from "@tanstack/react-table"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { TableOptions } from '@tanstack/table-core';
import { TablePaperVariant, TableVariant, TableCellVariant } from "./VariantSimpleDataTable"


export interface DataTableProps<TData extends SimpleRowData> extends Partial<TableOptions<TData>> {
    data: TData[];
    columns: ColumnDef<TData>[],
    isLoading?: boolean;
    onRowSelectionChange?: OnChangeFn<SimpleRowSelectionState>;
    rowSelection?: SimpleRowSelectionState;
    enableRowSelection?: boolean | ((row: Row<TData>) => boolean);
    enableSelectAll?: boolean;
    parentRow?: Row<TData>;
    variant?: "normal" | "nested";
}

const SimpleDataTable = <TData extends SimpleRowData>({
    data,
    columns,
    onRowSelectionChange,
    rowSelection,
    isLoading,
    enableRowSelection = false,
    variant = "normal",
    ...props
}: DataTableProps<TData>) => {
    const table = useReactTable({
        data,
        columns,
        state: {
            rowSelection,
        },
        enableRowSelection: enableRowSelection, //enable row selection for all rows
        onRowSelectionChange: onRowSelectionChange,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        ...props
        // debugTable: true,
    });

    return (
        <TableContainer component={TablePaperVariant} customVariant={variant}>
            <TableVariant customVariant={variant} size={"small"}>
                <TableHead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map(header => {
                                return (
                                    <TableCellVariant
                                        key={header.id}
                                        colSpan={header.colSpan}
                                        customVariant={variant}
                                        align={"center"}
                                    >
                                        {header.isPlaceholder ? null : (
                                            <>
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                            </>
                                        )}
                                    </TableCellVariant>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody sx={{
                    marginTop: 10
                }}>
                    {
                        isLoading && (
                            <TableRow>
                                <TableCellVariant colSpan={columns.length} customVariant={variant} align="center" >
                                    <Box display={"flex"} width={"100%"} justifyContent={"center"} alignContent={"center"}>
                                        <CircularProgress />
                                    </Box>
                                </TableCellVariant>
                            </TableRow>

                        )
                    }

                    {table.getRowModel().rows.map(row => {
                        return (
                            <TableRow key={row.id} hover={!!enableRowSelection}>
                                {row.getVisibleCells().map(cell => {
                                    return (
                                        <TableCellVariant key={cell.id} customVariant={variant} align="center">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCellVariant>
                                    )
                                })}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </TableVariant>
        </TableContainer>
    )
}



export default SimpleDataTable