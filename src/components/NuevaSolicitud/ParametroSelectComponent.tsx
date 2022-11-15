import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const ParametroSelectComponent = ({onChange}: any) => {
    const parametrosSelect = useSelector((state: RootState) => state.parametro.parametrosSelect);    

    if (Object.keys(parametrosSelect).length === 0) {
        
        return null;
    }

    return (

    <div className="flex pl-10 pr-10 pt-4 gap-4">
        {/* {JSON.stringify(parametrosSelect)} */}
        {
            Object.keys(parametrosSelect).map((item) => {
                return (
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
                )
            })
        }
        </div>
  )
}

export default ParametroSelectComponent