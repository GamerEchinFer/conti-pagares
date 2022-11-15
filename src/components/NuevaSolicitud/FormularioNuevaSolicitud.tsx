import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import BackButton from '../Buttons/BackButton';

const FormularioNuevaSolicitud = () => {

  const [idProducto, setProducto] = useState()
  const [idSubProducto, setIdSubProducto] = useState()
  const [parametroVisible, setParametroVisible] = useState()

  const productos = useSelector((state: RootState) => state.producto.items);
  const actividad = useSelector((state: RootState) => state.producto.items);
  const subProductos = useSelector((state: RootState) => state.subProducto.items);
  const tipoRiesgo = useSelector((state: RootState) => state.producto.items);
  const destino = useSelector((state: RootState) => state.producto.items);
  

  return (
    <>
      <Grid container spacing={3} mt={2}>
        <Grid item xs={12} sm={6} >
          <FormControl size="small" fullWidth>
            <InputLabel id="demo-simple-select-label">Productos</InputLabel>
              <Select
                className="text-left"
                style={{
                  color: "#151515",
                  fontWeight: "400",
                  fontSize:"16px",
                }}              
                label="Producto"              
              >
                {
                  productos.map((item) => {
                    return <MenuItem key={item.idProducto} value={item.idProducto}>{item.descripcion}</MenuItem>
                  })
                } 
              </Select>
              </FormControl>
          
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl size="small" fullWidth>
            <InputLabel id="demo-simple-select-label">Actividad</InputLabel>
            <Select
              className="text-left"
              style={{
                color: "#151515",
                fontWeight: "400",
                fontSize:"16px",
              }}              
              label="Actividad"              
            >
              {
                actividad.map((item) => {
                  return <MenuItem key={item.idProducto} value={item.idProducto}>{item.descripcion}</MenuItem>

                })
              } 
            </Select>
          </FormControl>
        </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl size="small" fullWidth>
              <InputLabel id="demo-simple-select-label">SubProducto</InputLabel>
              <Select
                className="text-left"
                style={{
                  color: "#151515",
                  fontWeight: "400",
                  fontSize:"16px",
                }}              
                label="SubProducto"              
              >
                {
                  subProductos.map((item) => {
                    return <MenuItem key={item.idSubProducto} value={item.idSubProducto}>{item.descripcion}</MenuItem>
                  })
                } 
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl size="small" fullWidth>
              <InputLabel id="demo-simple-select-label">Tipo Riesgo</InputLabel>
              <Select
                className="text-left"
                style={{
                  color: "#151515",
                  fontWeight: "400",
                  fontSize:"16px",
                }}              
                label="Tipo Riesgo"              
              >
                {
                  tipoRiesgo.map((item) => {
                                        return <MenuItem key={item.idProducto} value={item.idProducto}>{item.descripcion}</MenuItem>

                  })
                } 
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
          <FormControl size="small" fullWidth>
            <InputLabel id="demo-simple-select-label">Actividad</InputLabel>
            <Select
              className="text-left"
              style={{
                color: "#151515",
                fontWeight: "400",
                fontSize:"16px",
              }}              
              label="Actividad"              
            >
              {
                actividad.map((item) => {
                                      return <MenuItem key={item.idProducto} value={item.idProducto}>{item.descripcion}</MenuItem>

                })
              } 
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl size="small" fullWidth>
            <InputLabel id="demo-simple-select-label">Destino</InputLabel>
            <Select
              className="text-left"
              style={{
                color: "#151515",
                fontWeight: "400",
                fontSize:"16px",
              }}              
              label="Destino"              
            >
              {
                destino.map((item) => {
                  return <MenuItem key={item.idProducto} value={item.idProducto}>{item.descripcion}</MenuItem>

                })
              } 
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {/* <BackButton /> */}
    </>
  )
}

export default FormularioNuevaSolicitud