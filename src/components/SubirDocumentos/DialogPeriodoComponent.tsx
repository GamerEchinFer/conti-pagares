import { Divider, Grid, ListItem, ListItemText, Stack, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as pdfjsLib from 'pdf-lib';
import * as React from 'react';
import { useRef, useState, ChangeEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { theme } from '../../../theme/Theme';
import { getDescargarHadoopDirecto } from '../../api/apmDesaApi';
import { capitalize } from '../../helpers/capitalize';
import { parsePdfBase64 } from '../../helpers/cutPdf';
import { EtiquetaVariableResponse } from '../../interfaces/interfaces';
import { etiquetaVariableActions } from '../../redux/slices/etiquetaVariable.slice';
import { hadoopDirectoActions } from '../../redux/slices/hadoop.slice';
import BackButton from '../Buttons/BackButton';
import ButtonCargar from '../Buttons/ButtonCargar';
import ButtonIconClose from '../Buttons/ButtonIconClose';
import { LightTooltip } from '../shared/LightTooltip';
import FileUploadIconComponent from './FileUploadIconComponent';
import ViewPDFComponent from './ViewPDFComponent';
import dayjs from 'dayjs';

type DialogPeriodoComponentProps = {
  item: EtiquetaVariableResponse
}


const buttonStyle = (item: EtiquetaVariableResponse) =>  ({
  fontSize:"20px", color: item.tieneDocumento ? "#BEC400" : "#1D428A", fontWeight:"400"
})

export default function DialogPeriodoComponent({item}: DialogPeriodoComponentProps) {
  const dispatch = useDispatch();


  const [archives, setArchives] = useState(null);
  
  const fullScreen = useMediaQuery(theme.breakpoints.down('xl'));
  
  const [ openDialogSecondary, setOpenDialogSecondary] = useState(false);

  const handleDrop = (e:any) => {
    e.prevent.default();
    console.log(Array.from(e.dataTransfer.files));
    setArchives(e.dataTransfer.archives);
  };

  const handleDragOver = (e:any) => {
    
  };

  const handleClose = () => {
    // setOpen(false);
    // setOpenDialogSecondary(true);
    dispatch(etiquetaVariableActions.etiquetaVariableCloseAllModals());
  };

  const handleFile = (files: any) => {
    if (!files) return

    dispatch(hadoopDirectoActions.setFiles(files));

    const reader = new FileReader();
    reader.readAsDataURL(files[Number(0)]);
    
    reader.onload = function () {
      pdfjsLib.PDFDocument.load( reader.result?.toString() ?? "").then((pdfDoc) => {          
        dispatch(etiquetaVariableActions.etiquetaVariableUpdateFile({
          idTipoDocumento: item.idTipoDocumento, 
          file: files[Number(0)], 
          base64: reader.result?.toString() ?? "",
          base64Modified: reader.result?.toString() ?? "", 
          totalPages: pdfDoc.getPageCount(),
          size: files[Number(0)].size / 1000000,
          filename: files[Number(0)].name ?? ""                  
        }));
      })
    }
  }

const meses: {[key: number]: JSX.Element} = {
  0:  <span>Enero</span>,
  1:  <span>Febrero</span>,
  2:  <span>Marzo</span>,
  3:  <span>Abril</span>,
  4:  <span>Mayo</span>,
  5:  <span>Junio</span>,
  6:  <span>Julio</span>, 
  7:  <span>Agosto</span>,
  8:  <span>Septiembre</span>,
  9:  <span>Octubre</span>,
  10: <span>Noviembre</span>,
  11: <span>Diciembre</span>,
}

  const { PDFDocument } = pdfjsLib;

  let pdfDoc;

  const handleClickTieneDocumento = async ({datosAdicionales}: EtiquetaVariableResponse) => {
    if (!datosAdicionales || !Array.isArray(datosAdicionales) || !datosAdicionales.length ) return;
    
    const rutaHadoop =  datosAdicionales[0].rutaHadoop
    const descripcion = datosAdicionales[0].descripcion

    const download = await getDescargarHadoopDirecto(rutaHadoop)

    const viewPdf = `data:application/pdf;base64,${download?.data?.loc ?? ""}` 
    const el = document.createElement("a");
      el.href = viewPdf;
      el.click();

      dispatch(etiquetaVariableActions.etiquetaVariableUpdateFileModified({
        idTipoDocumento: item.idTipoDocumento,
        base64Modified: parsePdfBase64(viewPdf as string),
        totalPagesModified: 1,
        sizeModified: 1000
      }))

    const existingPdfBytes = await fetch(viewPdf).then((res) => res.arrayBuffer());

    return PDFDocument.load(existingPdfBytes);
    
  }

  const openViewPdfModal = (item: EtiquetaVariableResponse) => {    
    handleClickTieneDocumento(item);    
    dispatch(etiquetaVariableActions.setOpenModalView({idTipoDocumento: item.idTipoDocumento, openModalView: true}))
  }

  const [inputPeriodo, setInputPeriodo] = useState("");

  // const handlePeriodoInput = ({target}: ChangeEvent<HTMLInputElement>) => {
  //   if (Number(target.value) >= 6) {
  //     setInputPeriodo(target.value)
  //   }
  // }

  const [mesPeriodos, setmesPeriodos] = useState<number[]>([])
    const [periodo, setPeriodo] = useState("6")
    const inputRef = useRef<any>()

    useEffect(() => {
        generateMesPeriodos(6)
    }, [])

    function generateMesPeriodos(valuePeriodo: number) {
        const items: number[] = []
        const monthActual = dayjs().month()
        for (let i = monthActual; i > monthActual - valuePeriodo; i--) {
            const nuevoMonth = dayjs().month(i).month()
            items.push(nuevoMonth)
        }

        setmesPeriodos([...items])
    }

    const handlePeriodoInput = ({target}: ChangeEvent<HTMLInputElement>) => {
        if (Number(target.value) >= 6  || !Number(target.value)) {
          setPeriodo(target.value) // Se actualiza despues recien de la funcion
          // Hasta donde se puede retroceder

        }

        if (Number(target.value) >= 6) {
            generateMesPeriodos(Number(target.value))
        }
      }
  return (
    <>        
      <Dialog
        fullScreen={fullScreen}
        open={!!item.openModalPeriodo}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{ sx: { top: 10, m: 0 , maxWidth: "40%", height: "80%" }}}
      >
       <DialogActions>
          <ButtonIconClose autoFocus={true} onClick={handleClose} />
        </DialogActions>
       <DialogTitle 
          className="flex justify-center"
          style={{color: "#1D428A", fontWeight:"400px", fontSize:"16px"}}
          sx={{paddingTop: "15px" }}
        >
          Elegir la cantidad de documentos a adjuntar
          <Stack
            component="form"
            sx={{ width: '7ch' }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-number"
              className="periodicidad"
              onFocus={() => inputRef.current.select()} ref={inputRef} value={periodo} onChange={handlePeriodoInput}
              type={"number"}
              size="small"
              InputLabelProps={{
              shrink: true,
              }}
              variant="outlined"
            />
          </Stack>
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            <Grid item xs={12} md={6}>
              {/* <ListItem
                component="div"
                disablePadding
                className="pb-2 pt-2"
                secondaryAction={
                  item.tieneDocumento 
                    ? 
                    <RecargarDocIcon onClick={() => inputRef.current.click()}  />: null                        
                    // : <FileUploadIconComponent onClick={() => inputRef.current.click()} />
                }
                > */}
                <ListItemText
                  // className="pr-2"
                  primary={item.tieneDocumento
                  ? (
                    <>
                      <LightTooltip disableTouchListener title="Visualizar archivo cargado" arrow>
                        <button style={buttonStyle(item)} onClick={() => openViewPdfModal(item)}>                  
                          {(capitalize(`${item.tipoDocumento}`))}                      
                        </button>
                      </LightTooltip>
                    </>
                  ) : capitalize(`${item.filename}`)
                  // ) : null
                }
                  sx={{fontSize:"12px", color:"#1D428A", fontWeight:"400"}}
                />
                
                <ListItemText primary={
                   mesPeriodos.map((idx) => {
                    return (
                    <>
                      <ListItem key={idx}>
                        <ListItem>
                          {idx}
                        </ListItem>
                        <ListItem>{meses[idx]}</ListItem>
                        <FileUploadIconComponent onClick={() => inputRef.current.click()} />
                      </ListItem>
                      <Divider />
                    </>
                    )
                  })
                } />
                
              {/* </ListItem> */}
              
              {
                !archives && (
                  <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}>
                      <input
                        type="file"
                        // multiple solo en casos de selección multiple           
                        onChange={(event) => handleFile(event.target.files)}
                        hidden
                        ref={inputRef}
                        // Only PDF
                        accept=".pdf" 
                      />
                  </div>
                )
              }
              <ViewPDFComponent item={item} />
            </Grid>
          </DialogContentText>
        </DialogContent>
        <div className="flex justify-center gap-4 pb-16">
          <BackButton onClick={handleClose} />
          <ButtonCargar onClick={handleClose} />
        </div>
      </Dialog>
    </>
  );
}
