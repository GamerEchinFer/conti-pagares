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
import { cutPdf, parsePdfBase64 } from '../../helpers/cutPdf';
import { useEffect } from 'react';
import  "dayjs/locale/es";
import { RootState } from '../../redux/store';
import { useDocumento } from './hooks/useDocumento';
import { intervaloPDF } from '../../helpers/intervaloPDF';

type ModalPDFComponentProps = {
  item: EtiquetaVariableResponse,
  refresh: () => void
}

const filterPdf = () => ({
  cut_from: "",
  cut_to: "",
});

const interPdf = () => ({
  intervalo: "",
});


export default function ModalPDFComponent({item, refresh}: ModalPDFComponentProps) {
  const dispatch = useDispatch();
  const documento = useDocumento();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xl'));

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }; 
  const [href, setHref] = useState("");
  
  const [filter, setFilter] = useState(filterPdf());

  const [inter, setInter] = useState(interPdf());

  const [valorInput, setValorInput] = useState('');

  const debouncedValue = useDebounce(filter, { wait: 500 });  

  const debouncedInter = useDebounce(inter, { wait: 500 });

  const [seleccion, setSeleccion] = useState('Todo');

  const seleccionTodo = (e: any) => {
    setSeleccion(e.target.value)
  }
  const seleccionDesHas = (e: any) => {
    setSeleccion(e.target.value)
  }
  const seleccionIntervalo = (e: any) => {
    setSeleccion(e.target.value)
  }
  const files = useSelector((state: RootState) => state.hadoopDirecto.files);
  const [fechaEmision, setFechaEmision] = useState(new Date().toISOString());
  const [operacion, setOperacion] = useState(""); 
  
  
  useEffect(() => {
    confirmCutPdf()    
  }, [debouncedValue]);


  useEffect(() => {
    confirmInterPdf()
  }, [debouncedInter]);
  
  dayjs.locale("es");
  const date = dayjs().format("DD/MMMM/YYYY");
  const [value, setValue] = useState<Dayjs | null>(
    dayjs(),
  );                                                                                             

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };

  useMount(() => {                
    hadoopDirectoActions.setFiles(null)
  });

  const handleClose = () => {
    dispatch(etiquetaVariableActions.etiquetaVariableCloseAllModals());
  };    

  const confirmCutPdf = async () => {

      const base64 = item?.base64 ?? "";

      if (!base64) return;  
      
      if (!Number(filter.cut_from) || !Number(filter.cut_to)) return;      
      
      const cut_from = Number(filter.cut_from);
      const cut_to = Number(filter.cut_to);
      const totalPages = Number(item.totalPages);
      const totalPagesModified = Number(item.totalPages);
      const pdfConfig = 'data:application/pdf;base64,${base64}';
      const buffer = Buffer.from(pdfConfig.substring(pdfConfig.indexOf(',') + 1));
      const sizeModified = Number(buffer.length / 1e+6);
      console.log("mb:" + buffer.length / 1e+6);

      try {        
        const base64Modified = await cutPdf(base64, cut_from, cut_to, totalPages, totalPagesModified, sizeModified,)       
                
        dispatch(etiquetaVariableActions.etiquetaVariableUpdateFileModified({
          idTipoDocumento: item.idTipoDocumento,
          base64Modified: parsePdfBase64(base64Modified as string),
          totalPagesModified: (cut_to + 1) - cut_from,
          sizeModified: sizeModified
        })); 

      } catch (err: any) {
        console.log(err);        
      }
  }

  const confirmInterPdf = async () => {

    const base64 = item?.base64 ?? "";
    
    if (!base64) return;

    if (!String(inter.intervalo)) return;

    const intervalo = String(inter.intervalo);
    const totalPages = Number(item.totalPages);
    const totalPagesModified = Number(item.totalPages);
    const pdfConfig = 'data:application/pdf;base64,${base64}';
    const buffer = Buffer.from(pdfConfig.substring(pdfConfig.indexOf(',') + 1));
    const sizeModified = Number(buffer.length / 1e+6);
    try {
      const base64Modified = await intervaloPDF(base64, intervalo, totalPagesModified, totalPages, sizeModified);

      dispatch(etiquetaVariableActions.etiquetaVariableUpdateFileModified({
        idTipoDocumento: item.idTipoDocumento,
        base64Modified: parsePdfBase64(base64Modified as string),
        totalPagesModified: parseInt(intervalo),
        sizeModified: sizeModified
      }))

    } catch (err: any) {
      console.log(err);
    }
  }
  const confirm = async () => {
    
    const res = await documento.guardarDocumento(item, fechaEmision, operacion);
    refresh()
    dispatch(etiquetaVariableActions.etiquetaVariableCloseAllModals());
  }


  const handleChangeFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter({
      ...filter,
      [event.target.name]: event.target.value
    });
  }

  const handleChangeIntervalo = (e: ChangeEvent<HTMLInputElement>) => {
    setInter({
      ...inter,
      [e.target.name]: e.target.value
    })
    const regex = /^[0-9,-]*$/;
    const value = e.target.value
    if (regex.test(value) || value === '') {
      setValorInput(value)
    }
  }

  return (          
    <Dialog
      fullScreen={fullScreen}
      open={!!item.openModal}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      PaperProps={{ sx: { top: 10, m: 0 , maxWidth: "90%", height: "80%" }}}
    >       
      <DialogActions>
        <ButtonIconClose 
          autoFocus={true}  
          onClick={handleClose} 
        />
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
            <div className="grid justify-start gap-2 w-full " style={{ border: "1px solid #B7B7B7", borderRadius: "4px", padding: "10px" }}>
              <div className='grid grid-cols-3 gap-1 w-full  '>
                <div className='gap-1 self-center'>
                  <input type="radio" name='seleccion' value='Todo' id='Todo' checked={seleccion === 'Todo'} onClick={seleccionTodo} />
                  <span className='p-2'>Todo</span>

                </div>
                <div className='gap-1 col-span-2 text-center'>
                  <input type="radio" name='seleccion' value='DesHas' id='DesHas' checked={seleccion === 'DesHas'} onClick={seleccionTodo} />
                  <span className=" p-2">Desde</span>
                  <input type="number" name="cut_from" value={filter.cut_from} onChange={handleChangeFilter} className="inputPDF" disabled={seleccion !== 'DesHas'} min='1'  max={item.totalPages} />
                  <span className="p-2">Hasta</span>
                  <input type="number" name="cut_to" value={filter.cut_to} onChange={handleChangeFilter} className="inputPDF" disabled={seleccion !== 'DesHas'} min='1' max={item.totalPages} />
                </div>

              </div>
              <div className='flex'>
                <input type="radio"
                  className='mr-2'
                  name='seleccion'
                  value='Intervalo'
                  id='Intervalo'
                  checked={seleccion === 'Intervalo'}
                  onClick={seleccionTodo}

                />
                <div className='flex w-full'>
                  <span className='gap-2 pr-2'>Intervalos: </span>
                  <input type="text"
                    placeholder='Ej.: 1-2, 9-10'
                    name='intervalo'
                    id='Intervalo' className='inputInter pl-3'
                    value={valorInput}
                    disabled={seleccion !== 'Intervalo'}
                    onChange={handleChangeIntervalo}
                    
                  />
                </div>
              </div>
              <span className='textHelper'>Escribe rangos de números y/o páginas separados por comas (ej. 2,5-8)</span>
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
                onChange={(e) => { setOperacion(e.target.value) }}
                placeholder="74783648247234"
                fullWidth
              />
            </div>
            
            <div className="flex flex-row justify-center gap-8 pb-4">
              <CancelButton onClick={handleClose}/>
              <ButtonConfirmar onClick={confirm} />
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
