import React, { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { etiquetaVariableActions } from '../../redux/slices/etiquetaVariable.slice';
import CancelButton from '../Buttons/CancelButton';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { theme } from '../../../theme/Theme';
import ButtonIconClose from '../Buttons/ButtonIconClose';
import { capitalize } from '../../helpers/capitalize';
import { EtiquetaVariableResponse } from '../../interfaces/interfaces';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import PDFComponent from './PDFComponent';
import { useDocumento } from './hooks/useDocumento';
import { RootState } from '../../redux/store';

type ModalPDFComponentProps = {
  item: EtiquetaVariableResponse
};

const filterPdf = () => ({
  cut_from: "",
  cut_to: ""
});

const secuenciaPdf = () => ({
  intervalos: ""
});


const ViewPDFComponent = ({item}: ModalPDFComponentProps) => {
    const dispatch = useDispatch();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xl'));

    const [filter, setFilter] = useState(filterPdf());

    const [secuencia, setSecuencia] = useState(secuenciaPdf());

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } }; 
    const [href, setHref] = useState("");
    const documento = useDocumento();

    const getFileHadoop = useSelector((state: RootState) => state.hadoopDirecto.files);
    const getFile = useSelector((state: RootState) => state.msFileStream.files);
    const downFileHadoop = useSelector((state: RootState) => state.hadoopDownload.response);
    const downFile = useSelector((state: RootState) => state.msFileStreamDescargar.response);

    const [fechaEmision, setFechaEmision] = useState(new Date().toISOString());

    const [pdf, setPdf] = useState(false);
    const [fileName, setFileName] = useState("");
    const [operacion, setOperacion] = useState(); 

    const [select, setSelect] = useState("Todo");
    const [inputValues, setInputValues] = useState("");

    const seleccionarTodo = (event: any) => {
      setSelect(event.target.value)
    }
    const seleccionInhabilitada = (event: any) => {
      setSelect(event.target.value)
    }
    const seleccionIntervalos = (event: any) => {
      setSelect(event.target.value)
    }

    const handleClose = () => {                        
        dispatch(etiquetaVariableActions.etiquetaVariableCloseAllModals())                
    }

    const [value, setValue] = React.useState<Dayjs | null>(
        dayjs(),
    ); 

    const handleChangeFilter = (event: ChangeEvent<HTMLInputElement>) => {
      setFilter({
        ...filter,
        [event.target.name]: event.target.value
      });
    }
    const handleChangeSecuencia = (event: ChangeEvent<HTMLInputElement>) => {
      setSecuencia({
        ...secuencia,
        [event.target.name]: event.target.value
      });

    const regex = /^[0-9,-]*$/;
    const value = event.target.value
      regex.test(value) ?? value === '' ;
      setInputValues(value)
    }


  return (
    <Dialog
      fullScreen={fullScreen}
      open={item?.openModalView ?? false}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      PaperProps={{ sx: { top: 10, m: 0 , maxWidth: "90%", height: "90%" }}}
    >             
      <DialogActions>
        <ButtonIconClose autoFocus={true} onClick={handleClose} />
      </DialogActions>
      <DialogTitle id="responsive-dialog-title" className="right-4">
        {capitalize(`${item.tipoDocumento}`)}
      </DialogTitle>  
      <div className="max-w-6xl grid grid-cols-2 gap-10">
        <DialogContent>
          <DialogContentText className="pb-4">
            <span className="pr-10">Tamaño: {item.size?.toFixed(3) ?? 0} MB</span>
            <span>Cantidad de Paginas: {item.totalPagesModified}</span>
          </DialogContentText>
            <div className="pb-4">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Fecha de Expedición"
                  inputFormat="DD-MM-YYYY"
                  value={item.datosAdicionales.map(index => index.fechaEmision)}
                  onChange={(value) => setFechaEmision(fechaEmision)}
                  renderInput={(params) => <TextField {...params}  sx={{ width: 508 }}/>}
                />
              </LocalizationProvider>
            </div>
            <form id="form">
              <div className="grid justify-start gap-2 w-full" style={{ border:"1px solid #B7B7B7", borderRadius:"4px", padding:"10px"}}>
                <div className="grid grid-cols-3 gap-1 w-full">
                  <div className="gap-2 self-center">
                    <input 
                      type="radio"
                      checked={select === "Todo"}
                      onClick={seleccionarTodo}
                      id="Todo"
                    />
                    <span className="p-2">Todo</span>
                  </div>
                  <div className="text-center gap-1 col-span-2">
                    <input 
                      type="radio"
                      checked={select === "seleccionInhabilitada"}
                      id="seleccionInhabilitada"
                      onClick={seleccionarTodo}
                    />
                    <span className="p-2">Desde</span>
                      <input 
                        type="number"
                        name="cut_from"
                        value={filter.cut_from}
                        onChange={handleChangeFilter}
                        className="inputPDF"
                        disabled={select !== "seleccionInhabilitada"}
                        min="1"
                        max={item.totalPages} 
                      /> 
                    <span className="p-2">Hasta</span>
                      <input 
                        type="number"
                        name="cut_to"
                        value={filter.cut_to}
                        onChange={handleChangeFilter}
                        className="inputPDF"
                        disabled={select !== "nseleccionInhabilitada"}
                        min="1"
                        max={item.totalPages} 
                      />
                  </div>
                </div>
                <div className="flex">
                  <input 
                    type="radio"
                    className="mr-2"
                    checked={select === "Intervalo"}
                    onClick={seleccionarTodo}
                  />
                  <div className="flex w-full">
                    <span className="gap-2 pr-2">
                      Intervalos:
                    </span>
                    <input 
                      type="text"
                      placeholder="Ej.: 1-2, 9-10" 
                      className="inputInter pl-3"
                      value={inputValues}
                      disabled={select !== "Intervalo"}
                      onChange={handleChangeSecuencia}
                    />
                </div>
              </div>
              <span 
                style={{ 
                  color: "#b7b7b7",
                }}
                className="text-left">
                  Escribe rangos de números y/o páginas separados por comas (ej. 2,5-8)
              </span>
              </div>
            </form> 
            <div className="pb-4 pt-4">
              <TextField
                label="Asociar a Operación"
                value={item.datosAdicionales.map(index => index.numeroOperacion)}
                fullWidth
              />
            </div>
            <div className="flex flex-row justify-center gap-8 pb-4">
              <CancelButton onClick={handleClose}/>
            </div>
        </DialogContent>
        <div className="max-w-10xl grid grid-cols" style={{width:"140%"}} >
          <DialogContent>
            <PDFComponent base64={item?.base64Modified ?? ""} />
          </DialogContent>
        </div>
      </div>
    </Dialog>
  )
}

export default ViewPDFComponent