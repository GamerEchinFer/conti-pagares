import { FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import ArrowSelect from '../shared/ArrowSelect';

const ParametroSelectComponent = ({onChange}: any) => {
    const parametrosSelect = useSelector((state: RootState) => state.parametro.parametrosSelect);

    if (Object.keys(parametrosSelect).length === 0) {

        return null;
    }

    return (

    <div className="flex pl-10 pr-10 pt-4 gap-4">
        {/* {JSON.stringify(parametrosSelect)} */}
        <Grid container spacing={2}>
        {
            Object.keys(parametrosSelect).map((item) => {
                return (
                    <>
                    <Grid item sm={12} >
                    <FormControl key={item} size="small" fullWidth style={{textTransform:"capitalize"}}>
                        <InputLabel id="demo-simple-select-label">{item}</InputLabel>
                        <Select
                            className="text-left"
                            style={{
                                color: "#151515",
                                fontWeight: "400",
                                fontSize:"16px",
                            }}
                            // name={data.item}
                            IconComponent={ArrowSelect}
                            label={item}
                            onChange={(event) => {
                                onChange(item, event.target?.value ?? 1)
                                // setIdParametro(Number(item.target?.value ?? 1));
                            }}
                            >
                            {
                                parametrosSelect[item].map((item: any) => {
                                    return <MenuItem key={item.idParametro} value={item.idParametro}>{item.descripcion}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                    </Grid>
                    </>
                )
            })
        }
    </Grid>
        </div>
  )
}

export default ParametroSelectComponent