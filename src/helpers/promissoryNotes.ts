import { PromissoryNotesConsult } from "../models/responses/promissoryNotes";

const getRowId = (row: PromissoryNotesConsult) => {
    return `${row.operacion}_${row.cliente.codigoCliente}_${row.cuota}`;
};

const findByRowId = (rows: PromissoryNotesConsult[], rowId: string) => {
    const [operacion, codigoCliente, cuota] = rowId.split('_');

    return rows.find(row => {
        return row.operacion === operacion && row.cliente.codigoCliente === codigoCliente && row.cuota === cuota;
    });
}


export const promissoryNotesHelper = {
    getRowId,
    findByRowId,
}