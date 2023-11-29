import TextField from '@mui/material/TextField'
import React, { useState } from 'react'


interface TextFieldFilterControlProps {
    label: string;
    key_: string;
    onChange: (value: string, key: string) => void;
}
const TextFieldFilterControl = ({ label, key_, onChange }: TextFieldFilterControlProps) => {
    const [value, setValue] = useState("");

    const handlerChangeValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(e.target.value);
    }

    const handlerBlurInputField = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
        onChange(value, key_);
    }
    return (
        <TextField
            size={"small"}
            variant="outlined"
            value={value}
            onChange={handlerChangeValue}
            onBlur={handlerBlurInputField}
            sx={{ flexGrow: 1, maxWidth: "250px" }}
            label={label}
        />
    )
}

export default TextFieldFilterControl