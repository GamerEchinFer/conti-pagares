import { Box, Checkbox, Collapse, IconButton, Table, TableBody, TableHead, Typography, tableCellClasses } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import React from 'react'
import TableCell from '@mui/material/TableCell';
import { styled } from '@mui/material';
import { FieldsDataTable, SimpleRowData } from '../../../interfaces/_common';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#ededef",
        color: "#373a3c",
        borderRadius: 5,
        paddingTop: 10,
        paddingBottom: 10
    },
    [`&.${tableCellClasses.body}`]: {
        border: "1px solid #ededef",
        borderRadius: 10,
        paddingTop: 5,
        paddingBottom: 5
    },
}));

interface RowProps<TData extends SimpleRowData> {
    showNestedRows?: boolean;
    selectable?: boolean;
    selected?: boolean;
    row: TData;
    columns: FieldsDataTable<TData>[];
    onClick?: (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>, row: any) => void
}
const Row = <TData extends SimpleRowData>({ columns, row, onClick, showNestedRows = false, selectable = false, selected = false }: RowProps<TData>) => {
    const [open, setOpen] = React.useState(false);

    const selectableRowSx = selectable ? {
        cursor: "pointer"
    } : {};

    const handlerClick = onClick !== undefined ? onClick : (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>, row: any) => { };
    return (
        <>
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, ...selectableRowSx }}
                hover
                onClick={(event) => handlerClick(event, row)}
            >
                {
                    selectable && (
                        <StyledTableCell padding="checkbox">
                            <Checkbox
                                color="primary"
                                checked={selected}
                            />
                        </StyledTableCell>
                    )
                }
                {
                    showNestedRows && (
                        <StyledTableCell>
                            <IconButton
                                aria-label="expand row"
                                size="small"
                                onClick={() => setOpen(!open)}
                            >
                                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                        </StyledTableCell>
                    )
                }

                {
                    columns.map((field) => {
                        const data_ = row[field.key];
                        const render_ = field?.render != null ? field?.render : (row: any) => <>{row}</>
                        return <StyledTableCell align="center" component="th" scope="row">
                            {render_(data_)}
                        </StyledTableCell>
                    })
                }
            </TableRow>
            {
                showNestedRows && (
                    <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <Box sx={{ margin: 1 }}>
                                    <Typography variant="h6" gutterBottom component="div">
                                        History
                                    </Typography>
                                    <Table size="small" aria-label="purchases">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Date</TableCell>
                                                <TableCell>Customer</TableCell>
                                                <TableCell align="right">Amount</TableCell>
                                                <TableCell align="right">Total price ($)</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell component="th" scope="row">
                                                    askjdhaksjdhakjsd
                                                </TableCell>
                                                <TableCell>32423423423</TableCell>
                                                <TableCell align="right">{4545}</TableCell>
                                                <TableCell align="right">
                                                    {Math.round(4564 * row.price * 100) / 100}
                                                </TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell component="th" scope="row">
                                                    askjdhaksjdhakjsd
                                                </TableCell>
                                                <TableCell>32423423423</TableCell>
                                                <TableCell align="right">{4564}</TableCell>
                                                <TableCell align="right">
                                                    {Math.round(4564 * row.price * 100) / 100}
                                                </TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell component="th" scope="row">
                                                    askjdhaksjdhakjsd
                                                </TableCell>
                                                <TableCell>32423423423</TableCell>
                                                <TableCell align="right">{4564}</TableCell>
                                                <TableCell align="right">
                                                    {Math.round(4564 * row.price * 100) / 100}
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Box>
                            </Collapse>
                        </TableCell>
                    </TableRow>
                )
            }

        </>
    )
}

export default Row