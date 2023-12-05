import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import React, { useEffect, useState } from 'react'
import { DateRangeControlValue } from '../../../interfaces/components/filterControls'
import dayjs, { Dayjs } from 'dayjs'
import { DATE_FORMAT } from '../../../constants/constants'

interface DateRangeFilterControlProps {
    label: string;
    key_: string;
    onChange: (key: string, date: DateRangeControlValue) => void
}
const DateRangeFilterControl = ({ label, key_, onChange }: DateRangeFilterControlProps) => {

    const [valueFromDate, setValueFromtDate] = useState<Dayjs | null>(dayjs());
    const [valueToDate, setValueToDate] = useState<Dayjs | null>(dayjs());

    const [value, setValue] = useState<DateRangeControlValue>({
        from: dayjs(),
        to: dayjs()
    });

    useEffect(() => {
        onChange(key_, value);
    }, [valueFromDate, valueToDate]);


    const handlerChangeStartDate = (value: Dayjs | null) => {
        setValueFromtDate(value);

        setValue(state => ({
            ...state,
            from: value ?? dayjs()
        }));

    };
    const handlerChangeEndDate = (value: dayjs.Dayjs | null) => {
        setValueToDate(value);

        setValue(state => ({
            ...state,
            to: value ?? dayjs()
        }));
    };

    return (
        <FormControl sx={{
            flexDirection: "row",
            alignItems: "center",
            gap: 2
        }}>
            <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>

                <Typography>Desde: </Typography>
                <DatePicker
                    value={valueFromDate}
                    onChange={handlerChangeStartDate}
                    format={DATE_FORMAT}
                    slotProps={{
                        textField: { sx: { width: 150 }, variant: "outlined", size: "small" }
                    }}
                />

                <Typography>Hasta: </Typography>
                <DatePicker
                    value={valueToDate}
                    format={DATE_FORMAT}
                    onChange={handlerChangeEndDate}
                    // renderInput={(params) => <TextField {...params} sx={{ width: 150 }} />}
                    slotProps={{
                        textField: { sx: { width: 150 }, variant: "outlined", size: "small" }
                    }}
                />
            </LocalizationProvider>
        </FormControl>
    )
}

export default DateRangeFilterControl