import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useTipoBusqueda } from '../hooks/useTipoBusqueda';

export type RadioButtonOptionProps = {
  tipoBusquedaSelected: number,
  setTipoBusquedaSelected: any
}
const  RadioButtonOption = ({tipoBusquedaSelected, setTipoBusquedaSelected}: RadioButtonOptionProps) => {
  const tipoBusquedas = useTipoBusqueda();
  return (
    <>
      <FormControl>
        <div className="absolute">
          <div className="labelRadio pl-20 pt-2 ml-8">Búsqueda por</div>
        </div>
          <div className="pl-60 pr-10">
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              value={tipoBusquedaSelected}
              name="radio-buttons-group"
              onChange={(item) => {
                setTipoBusquedaSelected(Number(item.target?.value ?? "codigo"));             
              }}
              >
              {tipoBusquedas.map((item) => (
                <FormControlLabel
                  key={item.id} 
                  value={item.id} 
                  control={<Radio />} 
                  label={item.nameTipoBusqueda} 
                />
              ))}
            </RadioGroup>
          </div>
      </FormControl>
    </>
  );
}
export default RadioButtonOption
