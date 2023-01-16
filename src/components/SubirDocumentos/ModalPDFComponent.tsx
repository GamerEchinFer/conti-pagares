import { Button, Checkbox, TextField, Tooltip } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useMount, useDebounce } from 'ahooks';
import dayjs, { Dayjs } from 'dayjs';
import React, {useState, ChangeEvent} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { theme } from '../../../theme/Theme';
import { capitalize } from '../../helpers/capitalize';
import { EtiquetaVariableResponse } from '../../interfaces/interfaces';
import { etiquetaVariableActions } from '../../redux/slices/etiquetaVariable.slice';
import { hadoopDirectoActions } from '../../redux/slices/hadoop.slice';
import ButtonConfirmar from '../Buttons/ButtonConfirmar';
import ButtonIconClose from '../Buttons/ButtonIconClose';
import CancelButton from '../Buttons/CancelButton';
import PDFComponent from './PDFComponent';
import * as pdfjsLib from 'pdf-lib'
import { cutPdf, parsePdfBase64 } from '../../helpers/cutPdf';
import { useEffect } from 'react';
import  "dayjs/locale/es";
import { RootState } from '../../redux/store';
import router from 'next/router';
import { base64ToFile } from '../../helpers/base64ToFile';
import { postAlzarHadoopDirecto } from '../../api/apmDesaApi';
import { useDocumento } from './hooks/useDocumento';

type ModalPDFComponentProps = {
  item: EtiquetaVariableResponse
}

const filterPdf = () => ({
  cut_from: "",
  cut_to: "",
})

export default function ModalPDFComponent({item}: ModalPDFComponentProps) {
  const dispatch = useDispatch();
  const documento = useDocumento();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xl'));
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }; 
  const [href, setHref] = useState("");
  
  const [filter, setFilter] = useState(filterPdf());
  const debouncedValue = useDebounce(filter, { wait: 500 });  
  const files = useSelector((state: RootState) => state.hadoopDirecto.files);
  const [fechaEmision, setFechaEmision] = useState(new Date().toISOString());
  const [operacion, setOperacion] = useState(); 
  
  
  useEffect(() => {
    confirmCutPdf()    
  }, [debouncedValue])

  dayjs.locale("es");
  const date = dayjs().format("DD/MMMM/YYYY");
  // const date = dayjs().locale("es").format("DD/MMMM/YYYY");
  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs(),
  );                                                                                             

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };

  useMount(() => {                
    hadoopDirectoActions.setFiles(null)
  })  

  const handleClose = () => {
    // setOpen(false);
    dispatch(etiquetaVariableActions.etiquetaVariableCloseAllModals())
  };    

  const confirmCutPdf = async () => {

      const base64 = item?.base64 ?? ""

      if (!base64) return  
      
      if (!Number(filter.cut_from) || !Number(filter.cut_to)) return      
      
      const cut_from = Number(filter.cut_from)
      const cut_to = Number(filter.cut_to)
      const totalPages = Number(item.totalPages)
      const totalPagesModified = Number(item.totalPages)
      const pdfConfig = 'data:application/pdf;base64,${base64}'
      const buffer = Buffer.from(pdfConfig.substring(pdfConfig.indexOf(',') + 1))
      const sizeModified = Number(buffer.length / 1e+6)
      console.log("mb:" + buffer.length / 1e+6);

      
      // tomamos de la base64 original para crear una instancia de pdfkit
      try {        
        const base64Modified = await cutPdf(base64, cut_from, cut_to, totalPages, totalPagesModified, sizeModified)       
                
        dispatch(etiquetaVariableActions.etiquetaVariableUpdateFileModified({
          idTipoDocumento: item.idTipoDocumento,
          base64Modified: parsePdfBase64(base64Modified as string),
          totalPagesModified: (cut_to + 1) - cut_from,
          sizeModified: sizeModified
        })) 

      } catch (err: any) {
        console.log(err);        
      }
      // base64 => cortar => base64Modified
  }

  const confirm = async () => {

    // const res = await documento.guardarDocumento(item, fechaEmision);
    const res = await documento.guardarDocumento(item, fechaEmision);
    //update list check
        
    dispatch(etiquetaVariableActions.etiquetaVariableRequest());
    // setHref(res.LOC)
    // setFileName("test") 

    console.log(res);                
    
  }


  const handleChangeFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter({
      ...filter,
      [event.target.name]: event.target.value
    })
  }

  return (          
    <Dialog
      fullScreen={fullScreen}
      open={!!item.openModal}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >       
        <DialogActions>
          <ButtonIconClose autoFocus={true} onClick={handleClose} />
        </DialogActions>
        <DialogTitle
          id="responsive-dialog-title"
          className="right-4"
        >
          {capitalize(`${item.tipoDocumento}`)}
        </DialogTitle>      
          <div className="max-w-6xl grid grid-cols-2 gap-10">
            <DialogContent>
              <DialogContentText
                className="pb-4 "
              >
                <span className="pr-10">Tamaño: {item.size?.toFixed(3) ?? 0} MB</span><span>Cantidad de Paginas: {item.totalPagesModified}</span>
              </DialogContentText>
                <div className="pb-4">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    label="Fecha de Expedición"
                    inputFormat="DD-MM-YYYY"
                    value={fechaEmision}
                    onChange={(value) => setFechaEmision(value as string)}
                    renderInput={(params) => <TextField {...params}  sx={{ width: 508 }}/>}
                    />
                </LocalizationProvider>
                  
                </div>
                <form id="form">
                  <div className="flex justify-start gap-2" style={{ border:"1px solid #B7B7B7",borderRadius:"4px", padding:"10px"}}>
                    <span className="pt-2">Cortar desde</span> <input type="number" name="cut_from" value={filter.cut_from} onChange={handleChangeFilter}  className="inputPDF" /> 
                    <span className="pt-2">Cortar hasta</span> <input type="number" name="cut_to" value={filter.cut_to} onChange={handleChangeFilter} className="inputPDF" />
                  </div>
                </form>                                                              
                <div>
                    {href}
                    Es un documento autenticado
                    <Checkbox {...label} defaultChecked />
                </div>
                <div className="pb-4 pt-4">
                  <TextField
                    label="Asociar a Operación"
                    value={operacion}
                    placeholder="74783648247234"
                    fullWidth
                  />
                </div>
                
                <div className="flex flex-row justify-center gap-8 pb-4">
                  <CancelButton onClick={handleClose}/>
                  <ButtonConfirmar onClick={confirm} />
                  {/* <ButtonModificar onClick={handleClose}/> */}
                </div>
            </DialogContent>
            <div className="max-w-10xl grid grid-cols" style={{width:"160%"}}>
            <DialogContent>
              <PDFComponent base64={item?.base64Modified ?? ""}  />
            </DialogContent>   
            </div>
          </div>
      </Dialog>    
  );
}
