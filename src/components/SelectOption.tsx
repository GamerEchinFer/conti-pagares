import { FormControl, Select, MenuItem, TextField, SelectChangeEvent, InputLabel } from '@mui/material';
import React from 'react';
function SelectOption() {

  const [codigoCliente, setCodigoCliente] = React.useState('Codigo de Cliente');
  
  const handleChangeCodCliente = (event: any) => 
  setCodigoCliente(event.target.value);
  return (
    <>
      <FormControl fullWidth>
        <InputLabel>Búsqueda por</InputLabel>
          <Select
            defaultValue="Código de Cliente"
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="Codigo de Cliente"
            onChange={handleChangeCodCliente}
          >
          </Select>
      </FormControl>
    
      <div className="pr-1 pt-4">
        <TextField 
          id="outlined-basic" 
          label={codigoCliente}
          variant="outlined"
          fullWidth
          inputProps={{ 'aria-label': 'Without label' }} 
        />
      </div>    
    </>
  )
}
export default SelectOption