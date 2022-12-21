import { Checkbox, TextField } from '@mui/material';
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
import { useDispatch } from 'react-redux';
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

type ModalPDFComponentProps = {
  item: EtiquetaVariableResponse
}

const filterPdf = () => ({
  cut_from: "",
  cut_to: "",
})

export default function ModalPDFComponent({item}: ModalPDFComponentProps) {
  const dispatch = useDispatch()
  const fullScreen = useMediaQuery(theme.breakpoints.down('xl'));
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }; 
  
  const [filter, setFilter] = useState(filterPdf());
  const debouncedValue = useDebounce(filter, { wait: 500 });  


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
            
      // tomamos de la base64 original para crear una instancia de pdfkit
      try {        
        const base64Modified = await cutPdf(base64, cut_from, cut_to, totalPages)       
                
        dispatch(etiquetaVariableActions.etiquetaVariableUpdateFileModified({
          idTipoDocumento: item.idTipoDocumento, 
          base64Modified: parsePdfBase64(base64Modified as string)
        }))

      } catch (err: any) {
        console.log(err);        
      }
      // base64 => cortar => base64Modified
  }

  const confirm = async () => {

    console.log(item);

    const pdfstr = await fetch(item.base64Modified as string);  
    const blobFromFetch= await pdfstr.blob();

  
    var blob = new Blob([blobFromFetch], {type: "application/pdf"});
    
    const blobUrl = URL.createObjectURL(blob);

    const formData = new FormData()
    formData.append("file", blob)

    // api 
    
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
                <span className="pr-10">Tamaño: {item.size?.toFixed(3) ?? 0} MB</span><span>Cantidad de Paginas: {item.totalPages}</span>
              </DialogContentText>
                <div className="pb-4">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    label="Fecha de Expedición"
                    inputFormat="DD - MM - YYYY"
                    value={value}
                    onChange={handleChange}
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
                    Es un documento autenticado
                    <Checkbox {...label} defaultChecked />
                </div>
                <div className="pb-4 pt-4">
                  <TextField
                    label="Asociar a Operación"
                    // value={"74783648247234"}
                    placeholder="74783648247234"
                    fullWidth
                  />
                </div>
                
                <div className="flex flex-row justify-center gap-8 pb-4">
                  <CancelButton onClick={handleClose}/>
                  <ButtonConfirmar onClick={confirm}/>
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
