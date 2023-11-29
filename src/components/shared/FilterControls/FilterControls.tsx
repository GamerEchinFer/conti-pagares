import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { FilterControlsItem, EFilterControlsTypes, FilterControlState, DateRangeControlValue, RadioFilterControlItem, SelectFilterControlItem, FilterControlMetaData } from '../../../interfaces/components/filterControls';
import RadioFilterControl from "./RadioFilterControl";
import DateRangeFilterControl from './DateRangeFilterControl';
import React, { useEffect, useState } from "react";
import SelectFilterControl from "./SelectFilterControl";
import TextFieldFilterControl from "./TextFieldFilterControl";

interface FilterControlsProps {
    filters: FilterControlsItem[];
    onChange: (filterState: FilterControlState[]) => void,
    metaData?: FilterControlMetaData
}
const FilterControls = ({ filters, onChange, metaData }: FilterControlsProps) => {
    const [filterState, setFilterState] = useState<FilterControlState[]>([]);

    useEffect(() => {
        onChange(filterState);
    }, [filterState]);

    //HANDLER PARA EL RADIO BUTTON
    const handlerChangeRadio = (key: string) => {
        const currentFilterState = [...filterState];
        const existFilterRadioButton = currentFilterState.find(f => f.type == EFilterControlsTypes.RadioButton);

        if (existFilterRadioButton) {
            existFilterRadioButton.key = key;
            setFilterState(currentFilterState);
        } else {
            setFilterState(state => {
                return [...state, {
                    key: key,
                    value: "",
                    type: EFilterControlsTypes.RadioButton
                }]
            })
        }
    }

    const handlerChangeRadioValue = (value: string) => {
        const currentFilterState = [...filterState];
        const existFilterRadioButton = currentFilterState.find(f => f.type == EFilterControlsTypes.RadioButton);

        if (existFilterRadioButton) {
            existFilterRadioButton.value = value;
            setFilterState(currentFilterState);
        }
    }

    //HANDLER PARA EL SELECT
    const handlerChangeSelect = (key: string) => {
        const currentFilterState = [...filterState];
        const existFilterSelect = currentFilterState.find(f => f.type == EFilterControlsTypes.Select);

        if (existFilterSelect) {
            existFilterSelect.key = key;
            setFilterState(currentFilterState);
        } else {
            console.log("Cambia select");
            setFilterState(state => {
                return [...state, {
                    key: key,
                    value: "",
                    type: EFilterControlsTypes.Select
                }]
            })
        }
    }

    const handlerChangeSelectValue = (value: string) => {
        const currentFilterState = [...filterState];
        const existFilterSelect = currentFilterState.find(f => f.type == EFilterControlsTypes.Select);

        if (existFilterSelect) {
            existFilterSelect.value = value;
            setFilterState(currentFilterState);
        }
    }

    //HANDLER PARA EL FILTRO DE RANGO DE FECHAS
    const handlerChangeDateRange = (key: string, date: DateRangeControlValue) => {
        const currentFilterState = [...filterState];
        const existFilterDateRange = currentFilterState.find(f => f.type == EFilterControlsTypes.DateRange);

        if (existFilterDateRange) {
            existFilterDateRange.value = date;
            console.log("currentFilterState: ", currentFilterState);
            setFilterState(currentFilterState);
        } else {
            setFilterState(state => {
                return [...state, {
                    key: key,
                    value: date,
                    type: EFilterControlsTypes.DateRange
                }]
            })
        }
    }

    //HANDLER PARA EL FILTRO DE SOLO TEXTFIELD
    const handlerChangeTextField = (value: string, key: string) => {
        const currentFilterState = [...filterState];
        const existFilterTextField = currentFilterState.find(f => f.type == EFilterControlsTypes.TextField && f.key == key);

        if (existFilterTextField) {
            existFilterTextField.value = value;
            setFilterState(currentFilterState);
        } else {
            setFilterState(state => {
                return [...state, {
                    key,
                    value,
                    type: EFilterControlsTypes.TextField
                }]
            })
        }
    }

    return (
        <Stack spacing={3}>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                gap: 2
            }}>
                {
                    filters.map(({ type, label, control }, i) => {

                        return <React.Fragment key={label.replace(" ", "").toLowerCase()}>
                            {
                                type == EFilterControlsTypes.RadioButton &&
                                <RadioFilterControl label={label} items={control as RadioFilterControlItem[]} onChangeRadio={handlerChangeRadio} onChange={handlerChangeRadioValue} />
                            }
                            {
                                type == EFilterControlsTypes.Select &&
                                <SelectFilterControl label={label} items={control as SelectFilterControlItem[]} onChangeSelect={handlerChangeSelect} onChange={handlerChangeSelectValue} />
                            }
                        </React.Fragment>
                    })
                }

                {
                    filters.map(({ label, key, type }) => {
                        return <React.Fragment key={label.replace(" ", "").toLowerCase()}>
                            {type == EFilterControlsTypes.TextField &&
                                <TextFieldFilterControl label={label} key_={key ?? ""} onChange={handlerChangeTextField} />
                            }
                        </React.Fragment>
                    })
                }
                {metaData && <Typography fontWeight={300}>{metaData?.clientFullName}</Typography>}
            </Box>
            {/* <Box>
                
            </Box> */}
            <Box sx={{
                display: "flex"
            }}>
                {
                    filters.map(({ type, label, key }, i) => {
                        return <React.Fragment key={key ?? i}>
                            {
                                type == EFilterControlsTypes.DateRange &&
                                <DateRangeFilterControl key_={key ?? ""} label={label} onChange={handlerChangeDateRange} />
                            }
                        </React.Fragment>
                    })
                }
            </Box>
        </Stack>

    )
}

export default FilterControls;