import { Dayjs } from "dayjs";
import { DeepKeys } from '@tanstack/react-table';
export interface FieldsDataTable<TData> {
    render?: (row: TData) => JSX.Element; // es para que se pueda manejar de forma diferente el render de la celda de las filas
    id?: DeepKeys<TData> | (string & {}); // es el identificador de la columna, se usará para identificar las filas seleccionables
    key: DeepKeys<TData> | (string & {}); // es la clave al que va a hacer referencia en el arreglo de datos
    label: string; // es el nombre que saldrá en la cabecera de la columna
    unique?: boolean; // esto es para que se identifique que la columna es unica, como un primary key
}

export type TValues = Record<string, any>;
export type SimpleRowData = Record<string, any>;
export interface TableState<TData extends SimpleRowData> {
    rowSelection: SimpleRowSelectionState;
}

export type SimpleRowSelectionState = Record<string, boolean>;

export interface ActionsDataTable {
    label: string;
    render?: (row: any) => JSX.Element;

}

export interface DateRangeRequestValue {
    from: Dayjs;
    to: Dayjs;
}

export interface NavItem {
    href: string;
    icon: JSX.Element;
    title: string;
    children?: NavItem[];
}