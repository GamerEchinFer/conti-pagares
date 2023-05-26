import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useSelector } from "react-redux";
import { capitalize } from "../../helpers/capitalize";
import { RootState } from "../../redux/store";

type SubProductosComponentProps = {
  idSubProducto: number,
  setIdSubProducto: any
}

const SubProductosComponent = ({idSubProducto, setIdSubProducto}: SubProductosComponentProps) => {
  const subProductos = useSelector((state: RootState) => state.subProducto.items);

  return (
    <>
      <div className="flex pl-10 pr-10 pt-4 ">
        <FormControl size="small" sx={{ minWidth: 470 }}>
          <InputLabel id="demo-simple-select-label">SubProductos</InputLabel>
            <Select
              className="text-left"
              style={{
                color: "#151515",
                fontWeight: "400",
                fontSize:"16px",
              }}
              value={idSubProducto}
              label="subproductos"
              onChange={(item) => {
                  setIdSubProducto(Number(item.target?.value ?? 1));
                }}
                >
              {
                Array.isArray(subProductos)
                ? subProductos.map((item: any) => {
                  return <MenuItem key={item.idSubProducto} value={item.idSubProducto}>{capitalize(`${item.descripcion}`)}</MenuItem>
                }) : null
              }  
            </Select>
          </FormControl>
      </div>
    </>
  )                    
}

export default SubProductosComponent