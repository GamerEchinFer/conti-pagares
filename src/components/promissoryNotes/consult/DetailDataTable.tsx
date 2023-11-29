import React, { useEffect, useMemo, useState } from 'react'

import SimpleDataTable from '../../shared/DataTable/SimpleDataTable';
import { Typography } from '@mui/material';
import { promissoryNotesServices } from '../../../services/promissoryNotesService';
import { PromissoryNotesStatusHistory } from '../../../interfaces/promissoryNotes';
import { MRT_ColumnDef } from 'material-react-table';
import CustomMaterialDataTable from '../../shared/DataTable/CustomMaterialDataTable';

interface DetailDataTableProps {
    promissoryNotesStatusHistory: PromissoryNotesStatusHistory[];
}
const DetailDataTable = ({ promissoryNotesStatusHistory: data }: DetailDataTableProps) => {
    const columns: MRT_ColumnDef<any>[] = useMemo<MRT_ColumnDef<any>[]>(
        () => [
            {
                accessorKey: "createdAt",
                header: "Fecha",
                size: 50
            },
            {
                accessorKey: "branch",
                header: "Sucursal",
                size: 50
            },
            {
                accessorKey: "status",
                header: "Seguimiento",
                accessorFn(originalRow) {
                    const statusUpperCase = originalRow.status as string;
                    return statusUpperCase.toUpperCase();
                },
                size: 50
            },
            {
                accessorKey: "area",
                header: "Área",
                size: 50
            },
            {
                accessorKey: "user",
                header: "Usuario",
                size: 50
            },
        ],
        [],
    );

    return (
        <>
            <Typography fontWeight={"bold"}>Historial de estados</Typography>
            <CustomMaterialDataTable data={data ?? []} columns={columns} variant="compact" />
        </>
    )
}

export default DetailDataTable