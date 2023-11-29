import { CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { SxProps, Theme } from '@mui/material/styles';
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { internalServices } from '../../../services/internalService';
import { TValues } from '../../../interfaces/_common';

interface AsyncInputLabelProps<TData extends TValues> {
    label: string;
    value: string;
    sx?: SxProps<Theme>;
    labelPropsSx?: SxProps<Theme>;
    valuePropsSx?: SxProps<Theme>;
    endPoint: "crc-client-data";
    onComplete?: (data: TData) => void;
}
const AsyncInputLabel = <TData extends TValues>({ label, value, sx, labelPropsSx, valuePropsSx, endPoint, onComplete }: AsyncInputLabelProps<TData>) => {
    const [value_, setValue_] = useState(value);

    const [isLoading, setLoading] = useState(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue_(e.target.value);
    }

    const handleClickSearch = async () => {
        setLoading(true);
        try {
            switch (endPoint) {
                case "crc-client-data":
                    const respCrcClient = await internalServices.getCrcClientDataByDocumentNumber(value_);
                    const crcClientData = respCrcClient?.data;
                    onComplete && onComplete(crcClientData as unknown as TData);
                default:
                    break;
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
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
            <TextField
                variant="standard"
                value={value_}
                fullWidth
                disabled={isLoading}
                sx={{
                    backgroundColor: "#e0e0e0",
                    borderRadius: "5px",
                    ...valuePropsSx
                }}
                InputProps={{
                    endAdornment: isLoading ?
                        <InputAdornment position="start">
                            <CircularProgress size={22} />
                        </InputAdornment>
                        : null,
                }}
                inputProps={{
                    sx: {
                        padding: "4px 5px 5px",
                        width: "100%",
                        overflow: "auto",
                        textOverflow: "ellipsis",
                    },
                }}
                onChange={handleChange}
            />
            <IconButton
                size="small"
                color='primary'
                sx={{
                    padding: "5px",
                    margin: "0px",
                    backgroundColor: "#e0e0e0",
                }}
                disabled={isLoading}
                onClick={handleClickSearch}
            >
                <SearchIcon />
            </IconButton>
        </Box>
    )
}

export default AsyncInputLabel