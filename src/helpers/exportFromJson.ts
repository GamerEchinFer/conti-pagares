import exportFromJSON from 'export-from-json';


interface ExportParams {
    data: any,
    fileName: string;
}
export const exportDataTable = ({ data, fileName }: ExportParams) => {
    const exportType = exportFromJSON.types.xls

    exportFromJSON({
        data,
        fileName,
        exportType
    })
}