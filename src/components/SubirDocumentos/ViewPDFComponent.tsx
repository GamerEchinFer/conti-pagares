import React, { ChangeEvent, useState } from 'react'
import { useMount } from 'ahooks';
import { hadoopDownloadActions } from '../../redux/slices/hadoopDownload.slice';
import { useDispatch } from 'react-redux';
import { etiquetaVariableActions } from '../../redux/slices/etiquetaVariable.slice';
import { useRef } from 'react';
import ButtonModificar from '../Buttons/ButtonModificar';
import CancelButton from '../Buttons/CancelButton';
import { Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
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
import { cutPdf, parsePdfBase64 } from '../../helpers/cutPdf';
import { useDocumento } from './hooks/useDocumento';

type ModalPDFComponentProps = {
    item: EtiquetaVariableResponse
}

const filterPdf = () => ({
    cut_from: "",
    cut_to: "",
})

const ViewPDFComponent = ({item}: ModalPDFComponentProps) => {
    const fullScreen = useMediaQuery(theme.breakpoints.down('xl'));
    const inputRef = useRef<any>();
    const [filter, setFilter] = useState(filterPdf());
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } }; 
    const [href, setHref] = useState("");
    const dispatch = useDispatch();
    const documento = useDocumento();
    const [fechaEmision, setFechaEmision] = useState(new Date().toISOString());

    useMount(() => {
        hadoopDownloadActions.hadoopDownloadRequest();
    })

    const handleClose = () => {                        
        dispatch(etiquetaVariableActions.etiquetaVariableCloseAllModals())                
    }

    const volverASubir = () => {
        
    }

    const [value, setValue] = React.useState<Dayjs | null>(
        dayjs(),
    ); 
      
    const handleChange = (newValue: Dayjs | null) => {
        setValue(newValue);
    };

    const handleChangeFilter = (event: ChangeEvent<HTMLInputElement>) => {
        setFilter({
          ...filter,
          [event.target.name]: event.target.value
        })
    }

    const confirmar = async () => {
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

    const getHadoop = async () => {

        // const res = await documento.guardarDocumento(item, fechaEmision);
        const res = await documento.guardarDocumento(item, fechaEmision);
        //update list check    
        dispatch(etiquetaVariableActions.etiquetaVariableRequest());
        // setHref(res.LOC)
        // setFileName("test")
    
        console.log(res);                
        
      }
  return (
        <Dialog
            fullScreen={fullScreen}
            open={item?.openModalView ?? false}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
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
                        className="pb-4">
                       <span className="pr-10">Tamaño: {item.size?.toFixed(3) ?? 0} Mb</span>
                    </DialogContentText>
                    <div className="pb-4">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                label="Fecha de Expedición"
                                inputFormat="DD - MM - YYYY"
                                value={fechaEmision}
                                onChange={(value) => setFechaEmision(value as string)}
                                disabled
                                renderInput={(params) => <TextField {...params} sx={{ width: 508 }} /> }
                            />
                        </LocalizationProvider>
                    </div>
                    <form id="form">
                        <div className="flex justify-start gap-2" style={{ border:"1px solid #B7B7B7",borderRadius:"4px", padding:"10px"}}>
                            <span className="pt-2">Cortar desde</span> <input type="number" name="cut_from" value={filter.cut_from} onChange={handleChangeFilter}  className="inputPDF" disabled/> 
                            <span className="pt-2">Cortar hasta</span> <input type="number" name="cut_to" value={filter.cut_to} onChange={handleChangeFilter} className="inputPDF" disabled/>
                        </div>
                    </form>
                    <div>
                    {href}
                    Es un documento autenticado
                    <Checkbox {...label} defaultChecked disabled/>
                    </div>
                    <div className="pb-4 pt-4">
                        <TextField
                            label="Asociar a Operación"
                            value={3465788}
                            placeholder="74783648247234"
                            fullWidth
                            disabled
                        />
                    </div>
                
                </DialogContent>
                <div className="max-w-10xl grid grid-cols" style={{width:"160%"}}>
                <DialogContent>
                <PDFComponent base64={item?.base64Modified ?? ""}  />
                </DialogContent>   
                </div>
            </div>

        </Dialog>
  )
}

export default ViewPDFComponent