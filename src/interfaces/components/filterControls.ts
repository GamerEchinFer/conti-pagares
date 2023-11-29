import { Dayjs } from "dayjs";

//RADIO CONTROL
export enum ERadioFilterControlType {
    Text = "text",
    Select = "select",
    Multiselect = "multiselect",
}
export interface RadioFilterControlItem {
    key: string;
    label: string;
    type: ERadioFilterControlType
}

//RANGE DATE
export interface DateRangeControlValue{
    from: Dayjs;
    to: Dayjs
}

//SELECT
export enum ESelectFilterControlType {
    Text = "text",
    Select = "select",
    Multiselect = "multiselect",
}
export interface SelectFilterControlItem {
    key: string;
    label: string;
    type: ESelectFilterControlType
}

export enum EFilterControlsTypes{
    RadioButton = "radioButton",
    Select = "select",
    TextField = "textField",
    MultiSelect = "multiSelect",
    Date = "date",
    DateRange = "dateRange"
}

export interface FilterControlsItem {
    type: EFilterControlsTypes;
    key?: string;
    control: FilterControlsControl;
    label: string;
};

export interface FilterControlState {
    key: string;
    value: any;
    type: EFilterControlsTypes
}

export interface FilterControlMetaData{
    clientFullName?: string; 
}

export type FilterControlsControl = RadioFilterControlItem[] | SelectFilterControlItem[];

