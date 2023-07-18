import { Divider, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { getDescargarHadoopDirecto, getDescargarMsFileStream } from '../../api/apmDesaApi';
import { parsePdfBase64 } from '../../helpers/cutPdf';
import { RootState } from '../../redux/store';
import { useMount } from 'ahooks';
import { msFileStreamActions } from '../../redux/slices/msFileStream.slice';

type DocumentListComponentProps = {
  item: EtiquetaVariableResponse,
  refresh: () => void
};

const buttonStyle = (item: EtiquetaVariableResponse) =>  ({
  fontSize:"20px", color: item.tieneDocumento ? "#BEC400" : "#1D428A", fontWeight:"400"
});

const DocumentListComponent  = ({item, refresh}: DocumentListComponentProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [archives, setArchives] = useState(null);
  const [download, setDownload] = useState("");

  const inputRef = useRef<any>();

  // const files: any = useSelector((state: RootState) => state.hadoopDirecto.files);
  const files: any = useSelector((state: RootState) => state.msFileStream.files);

  // useMount(() => {                
  //   hadoopDirectoActions.setFiles(null);
  // });
  

  useMount(() => {                
    msFileStreamActions.setFiles(null);
  });
  
  const handleDrop = (event:any) => {
    event.preventDefault();
    console.log(Array.from(event.dataTransfer.files));
    setArchives(event.dataTransfer.archives);
  };

  const handleDragOver = (event:any) => {
    
  }

  const handleFile = (files: any) => {
    if (!files && files.length === 0) return;

    // dispatch(hadoopDirectoActions.setFiles(files));
    dispatch(msFileStreamActions.setFiles(files));
    
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
    reader.onloadend = function() {
      console.log("Error de ejecución")
    };

  }
  
  const handleClickTieneDocumento = async ({datosAdicionales}: EtiquetaVariableResponse) => {
    if (!datosAdicionales || !Array.isArray(datosAdicionales) || !datosAdicionales.length ) return;
    const rutaHadoop = datosAdicionales[0].rutaHadoop;

    // const download = await getDescargarHadoopDirecto(rutaHadoop);
    const download = await getDescargarMsFileStream(rutaHadoop);

    // if (!download || !download.data || !download.data.loc) {
    //   console.log("El download.data.loc no existe: ", download);      
    //   return;
    // }

    if (!download || !download.data || !download.data.datosArchivo) {
      console.log("El download.data.datosArchivo no existe: ", download);      
      return;
    }

    // const viewPdf = `${download?.data?.loc ?? ""}` 
    const viewPdf = `${download?.data?.datosArchivo ?? ""}` 
    setDownload(viewPdf);
    
    dispatch(etiquetaVariableActions.etiquetaVariableUpdateFileModified({
      idTipoDocumento: item.idTipoDocumento,
      base64Modified: parsePdfBase64(viewPdf as string),
      totalPagesModified: 1,
      sizeModified: files[Number(0)].size / 1000000
    }))
    
  }

  const handleClickViewDoc = (event: React.MouseEvent<HTMLElement>) => {
    console.log(event.target);
  }

  const openViewPdfModal = (item: EtiquetaVariableResponse) => {    
    handleClickTieneDocumento(item);    
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
          <ModalPDFComponent item={item} refresh={refresh} />
          <DialogPeriodoComponent item={item} refresh={refresh}/>
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
                onChange={(event) => handleFile(event.target.files)}
                hidden
                ref={inputRef}
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