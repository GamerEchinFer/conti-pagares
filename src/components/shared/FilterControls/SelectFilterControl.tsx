import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import React, { useEffect, useRef, useState } from 'react'
import { ESelectFilterControlType, SelectFilterControlItem } from '../../../interfaces/components/filterControls'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

interface SelectFilterControlProps {
    items: SelectFilterControlItem[];
    label: string;
    onChangeSelect: (value: string, e?: SelectChangeEvent,) => void;
    onChange: (value: string, reason: "onBlur" | "onEnter") => void;
    onEnter?: () => void;
}

const SelectFilterControl = ({ items, label, onChangeSelect, onChange, onEnter }: SelectFilterControlProps) => {
    const [valueSelect, setValueSelect] = useState(items[0]);
    const [value, setValue] = useState("");
    //use ref para poder manejaer el focus del input
    const inputRef = useRef<HTMLInputElement>(null); // Update the type of inputRef

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
        onChange(value, "onBlur");
    }

    const handlePointerEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key != "Enter") return;
        onChange(value, "onEnter");
        inputRef.current?.blur();
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
                    ref={inputRef}
                    size={"small"}
                    variant="outlined"
                    value={value}
                    onChange={handlerChangeValue}
                    onBlur={handlerBlurInputField}
                    onKeyDown={handlePointerEnter}
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