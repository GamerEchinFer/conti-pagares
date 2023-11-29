import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import React, { useEffect, useState } from 'react'
import { ESelectFilterControlType, SelectFilterControlItem } from '../../../interfaces/components/filterControls'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { Paper } from '@mui/material'

interface SelectFilterControlProps {
    items: SelectFilterControlItem[];
    label: string;
    onChangeSelect: (value: string, e?: SelectChangeEvent,) => void;
    onChange: (value: string) => void;
}

const SelectFilterControl = ({ items, label, onChangeSelect, onChange }: SelectFilterControlProps) => {
    const [valueSelect, setValueSelect] = useState(items[0]);
    const [value, setValue] = useState("");

    useEffect(() => {
        onChangeSelect(items[0].key)
    }, []);

    const handlerChangeSelect = (e: SelectChangeEvent) => {
        const value = e.target.value;
        const findItem = items.find(r => r.key == value);
        if (findItem !== undefined) {
            setValueSelect({ ...findItem });
        }
        onChangeSelect(value, e);
    }

    const handlerChangeValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(e.target.value);
    }

    const handlerBlurInputField = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
        onChange(value);
    }

    return (
        <FormControl
            variant={"outlined"}
            sx={{
                flexDirection: "row",
                alignItems: "center",
                // gap: 2,
            }}
        >
            {/* <FormLabel id="filter-radio-buttons-group-label">{label}</FormLabel> */}
            <InputLabel id="select-filter-control-label">{label}</InputLabel>
            <Select
                value={valueSelect.key}
                onChange={handlerChangeSelect}
                label={label}
                sx={{
                    width: 200,
                    height: "40px",
                }}
            >
                {
                    items.map(({ key, label }) => (
                        <MenuItem key={key} value={key}>{label}</MenuItem>
                    ))
                }
            </Select>
            {
                valueSelect.type == ESelectFilterControlType.Text &&
                <TextField
                    size={"small"}
                    variant="outlined"
                    value={value}
                    onChange={handlerChangeValue}
                    onBlur={handlerBlurInputField}
                    sx={{
                        flexGrow: 1,
                        maxWidth: "250px"
                    }}
                    placeholder={`Ingresar ${valueSelect.label}`}
                />
            }

        </FormControl>
    )
}

export default SelectFilterControl