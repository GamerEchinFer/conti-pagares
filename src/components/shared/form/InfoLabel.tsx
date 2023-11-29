import { TextField } from '@mui/material';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { SxProps, Theme } from '@mui/material/styles';
import React, { useState } from 'react'

interface InfoLabelProps {
    label: string;
    value: string;
    variant?: "text" | "input-read-only";
    sx?: SxProps<Theme>;
    labelPropsSx?: SxProps<Theme>;
    valuePropsSx?: SxProps<Theme>;

}
const InfoLabel = ({ label, value, variant = "text", sx, labelPropsSx, valuePropsSx }: InfoLabelProps) => {
    const [value_, setValue_] = useState(value);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue_(e.target.value);
    }

    return (
        <Box sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            marginBottom: "10px",
            ...sx
        }}>
            <Typography
                fontWeight={"bold"}
                sx={{ ...labelPropsSx }}
            >
                {label}:
            </Typography>
            {variant == "text" && <Typography>{value}</Typography>}
            {
                variant == "input-read-only" &&
                <Typography
                    sx={{
                        backgroundColor: "#e0e0e0",
                        borderRadius: "5px",
                        padding: "5px",
                        width: "200px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        ...valuePropsSx
                    }}
                >
                    {value}
                </Typography>
            }

            {/* {
                variant == "input" &&
                <TextField
                    variant="standard"
                    value={value_}
                    fullWidth
                    sx={{
                        backgroundColor: "#e0e0e0",
                        borderRadius: "5px",
                        ...valuePropsSx
                    }}
                    inputProps={{
                        sx: {
                            padding: "4px 5px 5px",
                            width: "200px",
                            overflow: "auto",
                            textOverflow: "ellipsis",
                        }
                    }}
                    onChange={handleChange}
                />
            } */}
        </Box>
    )
}

export default InfoLabel