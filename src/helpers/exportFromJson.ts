import exportFromJSON from 'export-from-json';
import { HeaderExportMapper, TValues } from '../interfaces/_common';

interface ExportParams<TData extends TValues> {
    data: TData[],
    fileName: string;
    mapperFunction?: HeaderExportMapper<TData>[];
}

export const exportDataTable = <TData extends TValues = any>({ data, fileName, mapperFunction }: ExportParams<TData>) => {
    const exportType = exportFromJSON.types.xls
    const dataToExport = mapperFunction ? data.map((row) => {
        const rowToExport: TValues = {};
        mapperFunction.forEach((header) => {
            rowToExport[header.header] = header.accessorFn(row);
        });
        return rowToExport;
    }) : data;

    exportFromJSON({
        data: dataToExport,
        fileName,
        exportType
    })
};
