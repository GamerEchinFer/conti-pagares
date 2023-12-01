import { PromissoryNotesConsult } from "../responses/promissoryNotes";
type DeepKeysPrefix<T, TPrefix, TDepth extends any[]> = TPrefix extends keyof T & (number | string) ? `${TPrefix}.${DeepKeys<T[TPrefix], [...TDepth, any]> & string}` : never;
type ComputeRange<N extends number, Result extends Array<unknown> = []> = Result['length'] extends N ? Result : ComputeRange<N, [...Result, Result['length']]>;
type Index40 = ComputeRange<40>[number];
type IsTuple<T> = T extends readonly any[] & {
    length: infer Length;
} ? Length extends Index40 ? T : never : never;
type AllowedIndexes<Tuple extends ReadonlyArray<any>, Keys extends number = never> = Tuple extends readonly [] ? Keys : Tuple extends readonly [infer _, ...infer Tail] ? AllowedIndexes<Tail, Keys | Tail['length']> : Keys;
export type DeepKeys<T, TDepth extends any[] = []> = TDepth['length'] extends 5 ? never : unknown extends T ? string : object extends T ? string : T extends readonly any[] & IsTuple<T> ? AllowedIndexes<T> | DeepKeysPrefix<T, AllowedIndexes<T>, TDepth> : T extends any[] ? DeepKeys<T[number], [...TDepth, any]> : T extends Date ? never : T extends object ? (keyof T & string) | DeepKeysPrefix<T, keyof T, TDepth> : never;

interface ExportHeadersItem<T> {
    label: string;
    key: DeepKeys<T>;
}

export type DeepValue<T, TProp> = T extends Record<string | number, any> ? TProp extends `${infer TBranch}.${infer TDeepProp}` ? DeepValue<T[TBranch], TDeepProp> : T[TProp & string] : never;

// export interface PromissoryNotesConsult {
//     operacion: string;
//     numeroEnvio: string;
//     cuota: string;
//     fechaVencimiento: string;
//     estado: string;
//     observacion: string;
//     nombreClienteRecibe: string;
//     monto: number;
//     cliente: PromissoryNotesCustomer;
//     solicitud: PromissoryNotesRequest;
//     recepcion: PromissoryNotesReception;
//     envio: PromissoryNotesShipment;
//     devolucion: PromissoryNotesReturn;
//     recepcionCustodia: PromissoryNotesReceptionCust;
//     entrega: PromissoryNotesDelivery;
//     rechazo: PromissoryNotesReject;
//     parent?:string;
// }

export const promissoryNotesConsultExport: ExportHeadersItem<PromissoryNotesConsult>[] = [
    {
        key: "operacion",
        label: "Operación",
    },
    {
        key: "cuota",
        label: "Cuota",
    },
    {
        key: "estado",
        label: "Estado",
    },
    {
        key: "numeroEnvio",
        label: "Nro. Envío",
    },
    {
        key: "cliente.codigoCliente",
        label: "Código",
    },
    {
        key: "cliente.codigoCliente",
        label: "Nro. Documento",
    },
    {
        key: "cliente.nombreCliente",
        label: "Cliente",
    },
    {
        key: "observacion",
        label: "observacion",
    },
    {
        key: "envio.fechaEnvio",
        label: "Fecha",
    },
];

// preApprovedParameters.forEach((item) => {
//     promissoryNotesConsultExport.forEach((header) => {
//         // console.log(getDeepValue(item, header.key));
//         const value: DeepValue<PromissoryNotesConsult, DeepKeys<PromissoryNotesConsult>> = header.key;
//     })
// })

// function getDeepValue(obj: any, key: string): any {
//     const keys = key.split('.');
//     let value = obj;
//     for (const k of keys) {
//         value = value[k];
//         if (value === undefined) {
//             break;
//         }
//     }
//     return value;
// }
