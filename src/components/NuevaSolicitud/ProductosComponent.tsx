import { FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { SubProducto } from '../../interfaces/interfaces';
import { RootState } from '../../redux/store';

type ProductosComponentProps = {
    idProducto: number,
    setIdProducto: any
}

const ProductosComponent = ({idProducto, setIdProducto}: ProductosComponentProps) => {
  const productos = useSelector((state: RootState) => state.producto.items);
  const loading = useSelector((state: RootState) => state.producto.loading);
  
  const [idSubProducto, setIdSubProducto] = useState<SubProducto | null> (null);

  return (
    <>
      <div className="flex pl-10 pr-10 pt-4 ">
        {loading ? <span>Cargando...</span> : null}
        <FormControl size="small" fullWidth>
          <InputLabel id="demo-simple-select-label">Productos</InputLabel>
            <Select
              className="text-left"
              style={{
                color: "#151515",
                fontWeight: "400",
                fontSize:"16px",
              }}
              value={idProducto}
              label="productos"
              onChange={(item) => {
                  setIdProducto(Number(item.target?.value ?? 1));
              }}
            >
              {
                productos.map((item) => {
                  return <MenuItem key={item.idProducto} value={item.idProducto}>{item.descripcion}</MenuItem>
                })
              } 
            </Select>
        </FormControl>
      </div>
    </>
  )                    
}

export default ProductosComponent