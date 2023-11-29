import { Paper, TableCell, tableCellClasses, Table, styled } from "@mui/material";

//PARA EL VARIANTE NORMAL
const StyledPaperTable = styled(Paper)(({ theme, variant }) => ({
    boxShadow: "none"
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#ededef",
        color: "#373a3c",
        borderRadius: 5,
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 14
    },
    [`&.${tableCellClasses.body}`]: {
        border: "1px solid #ededef",
        borderRadius: 10,
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: 14
    },
}));
const StyledTable = styled(Table)(({ theme }) => ({
    borderCollapse: "separate",
    borderSpacing: "5px",
    minWidth: 650,
    minHeight: 200,
}));

//PARA EL VARIANTE NESTED
const StyledPaperTableNested = styled(Paper)(({ theme, variant }) => ({
    boxShadow: "none"
}));
const StyledTableCellNested = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "white",
        border: "1px solid #ededef",
        color: "#373a3c",
        borderRadius: 5,
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 14
    },
    [`&.${tableCellClasses.body}`]: {
        border: "1px solid white",
        borderRadius: 10,
        paddingTop: 3,
        paddingBottom: 3,
        fontSize: 14
    },
}));
const StyledTableNested = styled(Table)(({ theme }) => ({
    borderCollapse: "separate",
    borderSpacing: "4px",
    minWidth: 650,
    minHeight: 200,
    backgroundColor: "#ededef",
}));

export {
    StyledPaperTable,
    StyledTableCell,
    StyledTable,
    StyledPaperTableNested,
    StyledTableCellNested,
    StyledTableNested
};