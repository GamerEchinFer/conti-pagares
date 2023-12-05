import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import TextField from '@mui/material/TextField'
import React, { useEffect, useState } from 'react'
import { ERadioFilterControlType, RadioFilterControlItem } from '../../../interfaces/components/filterControls'


interface RadioFilterControlProps {
    items: RadioFilterControlItem[];
    label: string;
    onChangeRadio: (value: string, e?: React.ChangeEvent<HTMLInputElement>,) => void;
    onChange: (value: string) => void;
}

const RadioFilterControl = ({ items, label, onChangeRadio, onChange }: RadioFilterControlProps) => {
    const [valueRadio, setValueRadio] = useState(items[0]);
    const [value, setValue] = useState("");

    useEffect(() => {
        onChangeRadio(items[0].key)
    }, []);

    const handlerChangeRadio = (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
        const findItem = items.find(r => r.key == value);
        if (findItem !== undefined) {
            setValueRadio({ ...findItem });
        }
        onChangeRadio(value, e);
    }

    const handlerChangeValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(e.target.value);
    }

    const handlerBlurInputField = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
        onChange(value);
    }

    return (
        <FormControl sx={{
            flexDirection: "row",
            alignItems: "center",
            gap: 2
        }}>
            <FormLabel id="filter-radio-buttons-group-label">{label}</FormLabel>
            <RadioGroup
                row
                aria-labelledby="filter-radio-buttons-group-label"
                defaultValue={value}
                name="radio-buttons-group"
                onChange={handlerChangeRadio}
                value={valueRadio.key}
            >
                {
                    items.map(({ key, label }) => (
                        <FormControlLabel key={key} value={key} control={<Radio />} label={label} />
                    ))
                }
            </RadioGroup>

            {
                valueRadio.type == ERadioFilterControlType.Text &&
                <TextField
                    id="filled-basic"
                    size={"small"}
                    variant="outlined"
                    value={value}
                    onChange={handlerChangeValue}
                    onBlur={handlerBlurInputField}
                    sx={{ flexGrow: 1, maxWidth: "250px" }}
                />
            }

        </FormControl>
    )
}

export default RadioFilterControl