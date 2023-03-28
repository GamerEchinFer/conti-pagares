import React, { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
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
import { parsePdfBase64 } from '../../helpers/cutPdf';
import { useDocumento } from './hooks/useDocumento';
import { getDescargarHadoopDirecto } from '../../api/apmDesaApi';
import { RootState } from '../../redux/store';
import DatosClienteComponent from '../DatosClienteComponent';
import BackButton from '../Buttons/BackButton';
import { PDFDocument } from 'pdf-lib'

type ModalPDFComponentProps = {
    item: EtiquetaVariableResponse
}

const filterPdf = () => ({
    cut_from: "",
    cut_to: "",
})

const ViewPDFComponent = ({item}: ModalPDFComponentProps) => {
    const dispatch = useDispatch();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xl'));
    const [filter, setFilter] = useState(filterPdf());
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } }; 
    const [href, setHref] = useState("");
    const documento = useDocumento();
    const [download, setDownload] = useState("");
    const getFile = useSelector((state: RootState) => state.hadoopDirecto.files);
    const downFile = useSelector((state: RootState) => state.hadoopDownload.response);
    const [fechaEmision, setFechaEmision] = useState(new Date().toISOString());

    const [fileName, setFileName] = useState("");

    const containerRef = useRef(null);


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
        })
    }

    

    const open = async () => {
        const base64 = item?.base64 ?? ""

      if (!base64) return  
      const pdfConfig = 'data:application/pdf;base64,${base64}'
      const buffer = Buffer.from(pdfConfig.substring(pdfConfig.indexOf(',') + 1))

      try {              
        const download = await getDescargarHadoopDirecto(downFile)
        const viewPdf = `data:application/pdf;base64,${download?.data?.loc ?? ""}` 
        setDownload(viewPdf)           
        console.log(viewPdf)
        const el = document.createElement("a")
        el.href = viewPdf
        el.download = fileName
        el.click()
        
    } catch (err: any) {
        console.log(err);        
    }
}


async function embedPdfPages() {
  const flagUrl = 'https://pdf-lib.js.org/assets/american_flag.pdf';
  const constitutionUrl = 'https://pdf-lib.js.org/assets/us_constitution.pdf';

  const flagPdfBytes = await fetch(flagUrl).then((res) => res.arrayBuffer());
  const constitutionPdfBytes = await fetch(constitutionUrl).then((res) =>
    res.arrayBuffer(),
  );

  const pdfDoc = await PDFDocument.create();

  const [americanFlag] = await pdfDoc.embedPdf(flagPdfBytes);

  const usConstitutionPdf = await PDFDocument.load(constitutionPdfBytes);
  const preamble = await pdfDoc.embedPage(usConstitutionPdf.getPages()[1], {
    left: 55,
    bottom: 485,
    right: 300,
    top: 575,
  });

  const americanFlagDims = americanFlag.scale(0.3);
  const preambleDims = preamble.scale(2.25);

  const page = pdfDoc.addPage();

  page.drawPage(americanFlag, {
    ...americanFlagDims,
    x: page.getWidth() / 2 - americanFlagDims.width / 2,
    y: page.getHeight() - americanFlagDims.height - 150,
  });
  page.drawPage(preamble, {
    ...preambleDims,
    x: page.getWidth() / 2 - preambleDims.width / 2,
    y: page.getHeight() / 2 - preambleDims.height / 2 - 50,
  });

  const pdfBytes = await pdfDoc.save();
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
            <div className="max-w-6xl grid grid-cols-2 gap-10">
                <DialogContent>
                    <DialogContentText
                        className="pb-4">
                       <div className="pr-10" style={{ color: "#373A3C", fontSize:"16px"}}>Código de Cliente 
                            <span style={{color:"#818A91", fontSize:"16px"}}> 2344577</span></div>
                       <div className="pr-10">Mendoza Beloto Luis Alberto</div>
                       <div className="pr-10  pt-2" style={{ color: "#373A3C", fontSize:"16px"}}>Clasificación</div>
                       <span className="pr-10">Documento General</span>
                       <div className="pr-10 pt-2 pb-2" style={{ color: "#373A3C", fontSize:"16px"}}>Fecha Documento</div>
                       <span className="pr-10 pb-2">28/03/2023</span>
                       <div className="pr-10 pb-2 pt-2" style={{ color: "#373A3C", fontSize:"16px"}}>Vence 30/03/2023</div>
                       <div className="pr-10 pb-2 pt-2" style={{ color: "#373A3C", fontSize:"16px"}}>Nro. Cuentas 0</div>
                       <div className="pr-10 pb-4 pt-2" style={{ color: "#373A3C", fontSize:"16px"}}>Nro. Operación </div>
                       <div className="pr-10 pb-4">3453563677 </div>
                       <div className="pr-10 pb-2 pt-2" style={{ color: "#373A3C", fontSize:"16px"}}>Carga </div>
                       <span className="pr-10">Juan Perez   28/03/2023 </span>
                       <div className="pr-10 pb-2 pt-2" style={{ color: "#373A3C", fontSize:"16px"}}>Verifica </div>
                       <span className="pr-10">Juan Perez   28/03/2023 </span>
                       <div className="pr-10 pb-2 pt-2" style={{ color: "#373A3C", fontSize:"16px"}}>Certifica</div>
                       <span className="pr-10">Juan Perez   28/03/2023 </span>

                    </DialogContentText>
                    <div className="flex flex-row justify-center pb-4">
                        <BackButton onClick={embedPdfPages}/>
                    </div>
                </DialogContent>
                <div className="max-w-10xl grid grid-cols" style={{width:"160%"}} >
                <DialogContent>
                <div>
                    <object
                        data='https://pdfjs-express.s3-us-west-2.amazonaws.com/docs/choosing-a-pdf-viewer.pdf'
                        type="application/pdf"
                        width="500"
                        height="678"
                    >

                        <iframe
                        src='https://pdfjs-express.s3-us-west-2.amazonaws.com/docs/choosing-a-pdf-viewer.pdf'
                        width="500"
                        height="678"
                        >
                        <p>This browser does not support PDF!</p>
                        </iframe>
                    </object>
                    </div>
                </DialogContent>   
                </div>
            </div>
        </Dialog>
  )
}

export default ViewPDFComponent