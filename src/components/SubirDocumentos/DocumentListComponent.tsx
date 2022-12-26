import { Divider, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { capitalize } from '../../helpers/capitalize';
import { EtiquetaVariableResponse } from '../../interfaces/interfaces';
import { hadoopDirectoActions } from '../../redux/slices/hadoop.slice';
import { LightTooltip } from '../shared/LightTooltip';
import CheckUploadIconComponent from './CheckUploadIconComponent';
import DialogPeriodoComponent from './DialogPeriodoComponent';
import FileUploadIconComponent from './FileUploadIconComponent';
import ModalPDFComponent from './ModalPDFComponent';
import * as pdfjsLib from 'pdf-lib'
import { etiquetaVariableActions } from '../../redux/slices/etiquetaVariable.slice';
import RecargarDocIcon from './RecargarDocIcon';

type DocumentListComponentProps = {
  item: EtiquetaVariableResponse
}

const DocumentListComponent  = ({item}: DocumentListComponentProps) => {
  // const etiquetasVariables = useSelector((state: RootState) => state.etiquetaVariable.response);
  const dispatch = useDispatch();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [archives, setArchives] = useState(null);

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
    reader.readAsDataURL(files[0]);

    reader.onload = function () {

      pdfjsLib.PDFDocument.load( reader.result?.toString() ?? "").then((pdfDoc) => {          
          dispatch(etiquetaVariableActions.etiquetaVariableUpdateFile({
              idTipoDocumento: item.idTipoDocumento, 
              file: files[Number(0)], 
              base64: reader.result?.toString() ?? "",
              base64Modified: reader.result?.toString() ?? "", 
              totalPages: pdfDoc.getPageCount(),
              size: files[Number(0)].size / 1000000                    
          }));
      })                                         
    }
  }

  const handleClickModificarDoc = () => {

  }
  
  const handleClickOpen = () => {
    router.push('/dialog-components');
  } 

  return (
    <>
      <ListItem 
        component="div" 
        disablePadding 
        className="pb-2 pt-2"
        secondaryAction={                      
          item.tieneDocumento 
            ? <CheckUploadIconComponent onClick={() => handleClickModificarDoc} />
            // ? <RecargarDocIcon onClick={()=> handleClickModificarDoc} /> 
            : <FileUploadIconComponent onClick={() => inputRef.current.click()} />          
        }
        >
                 
      <LightTooltip 
        disableTouchListener 
        title="Visualizar archivo cargado" 
        arrow>
            <ListItemText
              className="pr-2"
              primary={capitalize(`${item.tipoDocumento}`)}       
              primaryTypographyProps={{fontSize:"20px", color: item.tieneDocumento ? "#BEC400" : "#1D428A", fontWeight:"400"}}
              
              secondary={
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
                </> : null}
            />
            </LightTooltip>
          
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
            accept=".pdf"></input>
        </div>
      )
    }
    </>
  );
}

export default DocumentListComponent;