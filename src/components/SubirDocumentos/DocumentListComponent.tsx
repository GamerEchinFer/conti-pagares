import { Divider, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { capitalize } from '../../helpers/capitalize';
import { EtiquetaVariableResponse } from '../../interfaces/interfaces';
import { hadoopDirectoActions } from '../../redux/slices/hadoop.slice';
import { LightTooltip } from '../shared/LightTooltip';
import DialogPeriodoComponent from './DialogPeriodoComponent';
import FileUploadIconComponent from './FileUploadIconComponent';
import ModalPDFComponent from './ModalPDFComponent';
import * as pdfjsLib from 'pdf-lib';
import { etiquetaVariableActions } from '../../redux/slices/etiquetaVariable.slice';
import RecargarDocIcon from './RecargarDocIcon';
import ViewPDFComponent from './ViewPDFComponent';
import { getDescargarHadoopDirecto } from '../../api/apmDesaApi';
import { parsePdfBase64 } from '../../helpers/cutPdf';

type DocumentListComponentProps = {
  item: EtiquetaVariableResponse
}

const buttonStyle = (item: EtiquetaVariableResponse) =>  ({
  fontSize:"20px", color: item.tieneDocumento ? "#BEC400" : "#1D428A", fontWeight:"400"
})


const DocumentListComponent  = ({item}: DocumentListComponentProps) => {
  // const etiquetasVariables = useSelector((state: RootState) => state.etiquetaVariable.response);
  const dispatch = useDispatch();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [archives, setArchives] = useState(null);
  const [isCheckedIcon, setisCheckedIcon] = useState(true)
  const [isShown, setIsShown] = useState(true);

  const inputRef = useRef<any>();

  const handleDrop = (event:any) => {
    event.preventDefault();
    console.log(Array.from(event.dataTransfer.files));
    setArchives(event.dataTransfer.archives);
  };

  const handleDragOver = (event:any) => {
    
  }

  const handleFile = (files: any) => {
    // setFiles(files)
    // Aca tambien subimos los archivos    
    if (!files) return

    dispatch(hadoopDirectoActions.setFiles(files))
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

  
  const handleClickTieneDocumento = async ({datosAdicionales}: EtiquetaVariableResponse) => {
    // Cuando tiene documento
    if (!datosAdicionales || !Array.isArray(datosAdicionales) || !datosAdicionales.length ) return;

    // Descargar el documento
    //TODO: SWITCH PARA HADOOP Y SOAP
    const rutaHadoop = datosAdicionales[0].rutaHadoop
    const descripcion = datosAdicionales[0].descripcion

    const download = await getDescargarHadoopDirecto(rutaHadoop)

    const viewPdf = `data:application/pdf;base64,${download.data.LOC}` 
    console.log("helloooo",viewPdf);
    const el = document.createElement("a")
    el.href = viewPdf
    el.download = descripcion
    el.click()
    
    dispatch(etiquetaVariableActions.etiquetaVariableUpdateFileModified({
      idTipoDocumento: item.idTipoDocumento,
      base64Modified: parsePdfBase64(viewPdf as string),
      totalPagesModified: 1, 
      sizeModified: 1000
    })) 
  }

  const handleClickModificarDoc = () => {

  }
  
  const handleClickOpen = () => {
    router.push('/dialog-components');
  } 

  const handleClickViewDoc = (event: React.MouseEvent<HTMLElement>) => {
    console.log(event.target);
  }

  const openViewPdfModal = (item: EtiquetaVariableResponse) => {    
    handleClickTieneDocumento(item) // Aca hay que generar el pdf     
    dispatch(etiquetaVariableActions.setOpenModalView({idTipoDocumento: item.idTipoDocumento, openModalView: true}))
  }

  return (
    <> 
      <ListItem 
        component="div" 
        disablePadding 
        className="pb-2 pt-2"
        secondaryAction={                      
          item.tieneDocumento 
            ? <RecargarDocIcon onClick={() => inputRef.current.click()}  />                        
            : <FileUploadIconComponent onClick={() => inputRef.current.click()} />          
        }
      >
          <ListItemText
            className="pr-2"
            primary={
              item.tieneDocumento 
              ? (
                <>
                  <LightTooltip disableTouchListener title="Visualizar archivo cargado" arrow>
                    <button style={buttonStyle(item)} onClick={() => openViewPdfModal(item)}>                  
                    {/* <button style={buttonStyle(item)}>                   */}
                      {(capitalize(`${item.tipoDocumento}`))}                      
                    </button>
                  </LightTooltip>
                </> 
              )                
              : capitalize(`${item.tipoDocumento}`)
            }       
            primaryTypographyProps={{fontSize:"20px", color: item.tieneDocumento ? "#BEC400" : "#1D428A", fontWeight:"400"}}
            secondary={
              (capitalize(`${item.tipoDocumento}`)) &&
              !item.tieneDocumento ?
              <>
                <Typography
                  sx={{fontSize:"12px", color:"#373A3C", fontWeight:"400"}}>
                    Adjunta el documento con el explorador de archivos
                </Typography>
                <span style={{fontSize:"16px", color:"#1D428A", fontWeight:"400" }}>
                  <div className="pt-2">
                  Subir desde el histórico
                  </div>
                </span>
              </> : null
              }
          />
        <ListItemButton>
          <ModalPDFComponent item={item} />
          <DialogPeriodoComponent item={item} />            
        </ListItemButton>                     
      </ListItem>
      <Divider />
      {
        !archives && (
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}>
              <input
                type="file"
                multiple            
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
    </>
  );
}

export default DocumentListComponent;