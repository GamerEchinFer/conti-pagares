import { TableCellProps, TableProps } from "@mui/material";
import { memo } from "react";
import { StyledPaperTable, StyledTableCell, StyledTable, StyledPaperTableNested, StyledTableCellNested, StyledTableNested } from "./StyledSimpleDataTable";

interface TableVariantProps {
    customVariant?: "normal" | "nested";
    children?: React.ReactNode;
}
const TablePaperVariant = memo(({ customVariant = "normal", children }: TableVariantProps) => {
    if (customVariant == "normal") {
        return (
            <StyledPaperTable>{children}</StyledPaperTable>
        );
    } else if (customVariant == "nested") {
        return (
            <StyledPaperTableNested>{children}</StyledPaperTableNested>
        );
    }
});

interface TableCellVariantProps extends TableCellProps {
    customVariant?: "normal" | "nested";
    children?: React.ReactNode;
}
const TableCellVariant = memo(({ customVariant = "normal", children, ...props }: TableCellVariantProps) => {
    if (customVariant == "normal") {
        return (
            <StyledTableCell {...props}>{children}</StyledTableCell>
        );
    } else if (customVariant == "nested") {
        return (
            <StyledTableCellNested {...props}>{children}</StyledTableCellNested>
        );
    }
});

interface TableVariantProps extends TableProps {
    customVariant?: "normal" | "nested";
    children?: React.ReactNode;
}
const TableVariant = memo(({ customVariant = "normal", children, ...props }: TableVariantProps) => {
    if (customVariant == "normal") {
        return (
            <StyledTable {...props}>{children}</StyledTable>
        );
    } else if (customVariant == "nested") {
        return (
            <StyledTableNested {...props}>{children}</StyledTableNested>
        );
    }
});

export { TablePaperVariant, TableCellVariant, TableVariant };