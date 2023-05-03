import { Divider, Grid, ListItem, ListItemText, Stack, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as pdfjsLib from 'pdf-lib';
import * as React from 'react';
import { useRef, useState, ChangeEvent, useEffect, DragEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { useMount } from 'ahooks';
import { RootState } from '../../redux/store';
import RecargarDocIcon from './RecargarDocIcon';
import ModalPDFComponent from './ModalPDFComponent';

interface MesPeriodo {
  file?: any,
  base64?: string
  name: string  
  mes: number
}

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
  
  const [download, setDownload] = useState("");

  const files = useSelector((state: RootState) => state.hadoopDirecto.files);

  const etiquetasVariables = useSelector((state: RootState) => state.etiquetaVariable.response);    

  useMount(() => {                
    hadoopDirectoActions.setFiles(null);
  });
  

  const onDrop = (event: DragEvent<HTMLDivElement>, {idTipoDocumento, periodicidad, tieneDocumento}: EtiquetaVariableResponse) => {

    if (tieneDocumento) return;
    const idx = event.dataTransfer.getData("file");         

    const reader = new FileReader();
    reader.readAsDataURL(files[Number(idx)]);

    reader.onload = function () {
      pdfjsLib.PDFDocument.load( reader.result?.toString() ?? "").then((pdfDoc) => {
        console.log(files[Number(idx)].size)
        dispatch(etiquetaVariableActions.etiquetaVariableUpdateFile({
          idTipoDocumento, 
          file: files[Number(idx)], 
          base64: reader.result?.toString() ?? "",
          base64Modified: reader.result?.toString() ?? "", 
          totalPages: pdfDoc.getPageCount(),
          size: files[Number(idx)].size / 1000000,
        }));
      })                                         
    }
  }

  const allowDrop = (event: any) => {
    event.preventDefault();
  }
  
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

  const handleFile = (filesInput: any) => {
    if (!filesInput && Array.isArray(filesInput) && filesInput.length === 0) return;
    

    // dispatch(hadoopDirectoActions.setFiles(filesInput));

    const mesPeriodo = {...mesPeriodoSelected} as MesPeriodo;

    setmesPeriodoSelected(undefined);
    
    const reader = new FileReader();
    reader.readAsDataURL(filesInput[0]);
    
    reader.onload = function () {
      pdfjsLib.PDFDocument.load( reader.result?.toString() ?? "").then((pdfDoc) => { 
                
        mesPeriodo.file = filesInput[0]
        mesPeriodo.name = filesInput[0].name ?? ""
        mesPeriodo.base64 = reader.result?.toString() ?? ""
        
        setmesPeriodos((props) => props.map(item => mesPeriodo.mes === item.mes ? {...mesPeriodo} : item))
        // dispatch(etiquetaVariableActions.etiquetaVariableUpdateFile({
        //   idTipoDocumento: item.idTipoDocumento, 
        //   file: files[Number(0)], 
        //   base64: reader.result?.toString() ?? "",
        //   base64Modified: reader.result?.toString() ?? "", 
        //   totalPages: pdfDoc.getPageCount(),
        //   size: files[Number(0)].size / 1000000,
        //   filename: files[Number(0)].name ?? ""                  
        // }));
        formRef.current?.reset()
      })

      // inputRef.current.value = ''
      // inputRef.current.type = ''
      // inputRef.current.type = 'file'
      
    }
    reader.onloadend = function() {
       console.log("Error de ejecución")
    };
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

  const handleClickTieneDocumento = async ({datosAdicionales}: EtiquetaVariableResponse) => {
    if (!datosAdicionales || !Array.isArray(datosAdicionales) || !datosAdicionales.length ) return;
    
    const rutaHadoop =  datosAdicionales[0].rutaHadoop;

    const download = await getDescargarHadoopDirecto(rutaHadoop);

    if (!download || !download.data || !download.data.loc) {
      // Alerta
      console.log("El download.data.loc no existe: ", download);      
      return;
    }

    const viewPdf = `${download?.data?.loc ?? ""}`;
    setDownload(viewPdf);

    dispatch(etiquetaVariableActions.etiquetaVariableUpdateFileModified({
      idTipoDocumento: item.idTipoDocumento,
      base64Modified: parsePdfBase64(viewPdf as string),
      totalPagesModified: 1,
      sizeModified: files[Number(0)].size / 1000000
    }));
  }

  const openViewPdfModal = (item: MesPeriodo) => {    
    // handleClickTieneDocumento(item);    
    // dispatch(etiquetaVariableActions.setOpenModalView({idTipoDocumento: item.idTipoDocumento, openModalView: true}))
  }

  const openModal = (item: EtiquetaVariableResponse) => {    
    handleClickTieneDocumento(item);    
    dispatch(etiquetaVariableActions.setOpenModal)
  }

  const [mesPeriodos, setmesPeriodos] = useState<MesPeriodo[]>([]);
  const [mesPeriodoSelected, setmesPeriodoSelected] = useState<MesPeriodo | undefined>(undefined);
  const [periodo, setPeriodo] = useState("6");
  const inputRef = useRef<any>();
  const formRef = useRef<HTMLFormElement | null>();
  
  useEffect(() => {
    generateMesPeriodos(6);
  }, []);

  function generateMesPeriodos(valuePeriodo: number) {
    const items: MesPeriodo[] = [];
    const monthActual = dayjs().month();
    for (let i = monthActual; i > monthActual - valuePeriodo; i--) {
      const nuevoMonth = dayjs().month(i).month();
      items.push({file: undefined, mes: nuevoMonth, name: ''});
    }
    setmesPeriodos([...items]);
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

  const openFile = (item: MesPeriodo) => {
    setmesPeriodoSelected(item)
    inputRef.current.click()    
  }

  const handleModalDocument = (item: EtiquetaVariableResponse) => {
    
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
            <ListItemText primary={
              mesPeriodos.map((idx, index) => {
              return (
                <>
                  <ListItem
                    component="div"
                    disablePadding
                    className="pb-2 pt-2"
                    secondaryAction={
                      item.tieneDocumento
                      ? 
                      <RecargarDocIcon onClick={() => openFile(idx)} />
                      :
                      <>
                      <button style={buttonStyle(item)} onClick={() => openModal(item)}>
                        <FileUploadIconComponent onClick={() => openFile(idx)} />
                      </button>
                      </>
                    }
                    >
                    <ListItem>                                        
                      <ListItemText
                        primaryTypographyProps={{color: !!idx.file ? "#BEC400" : "#1D428A"}}
                        primary={
                          !!idx.file 
                          ?
                          (
                            <>
                              <LightTooltip disableTouchListener title="Visualizar archivo cargado" arrow>
                                {/* Debe abrir el modal con el PDF que se subio en MESPERIODOS CON EL IDX */}
                                {/* CREAR UN NUEVO MODAL PDF */}
                                <button style={buttonStyle(item)} onClick={() => openViewPdfModal(idx)}>
                                {capitalize(`${idx.name}`)}
                                {/* {(capitalize(`${item.tipoDocumento}`))}                       */}
                                </button>
                            </LightTooltip>
                            </>
                          ) : `Nombre.Documento.${index + 1}`
                        }>
                      </ListItemText>
                      
                    </ListItem>
                    <ListItem>{meses[idx.mes]}</ListItem>
                  </ListItem>
                  <Divider />
                </>
                )
              })
            } />            
            {
              !archives && (
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  {/* <form ref={formRef}> */}
                    <input
                      type="file"
                      // multiple solo en casos de selección multiple           
                      onChange={(event) => handleFile(event.target.files)}
                      hidden
                      ref={inputRef}
                      // Only PDF
                      accept=".pdf" 
                    />
                  {/* </form> */}
                </div>
              )
            }
            <ViewPDFComponent item={item} />
            <ModalPDFComponent item={item} />
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
