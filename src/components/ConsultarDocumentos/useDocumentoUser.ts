import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { theme } from "../../../theme/Theme";
import { getDescargarHadoopDirecto, getDescargarMsFileStream } from "../../api/apmDesaApi";
import { parsePdfBase64, parsePdfBase64Image } from "../../helpers/cutPdf";
import { ColeccionDocumento } from "../../interfaces/interfaces";
import { RootState } from "../../redux/store";

export const useDocumentUser = () => {
  const datosCliente = useSelector((state: RootState) => state.clienteDatos.items);

  const fullScreen = useMediaQuery(theme.breakpoints.down('xl'));

  const [open, setOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState<ColeccionDocumento | undefined>(undefined);  
  const [base64, setBase64] = useState("");
  const [base64MsFileStream, setBase64MsFileStream] = useState("");

  const handleClose = () => {        
    setOpen(false);
  }

  const handleClickRow = async (row: ColeccionDocumento) => {        
    setRowSelected(row)
    setOpen(true);

    const rutaHadoop = row.datosAdicionales.rutaHadoop;

    const downloadHadoop = await getDescargarHadoopDirecto(rutaHadoop);
    const download = await getDescargarMsFileStream(rutaHadoop);

    if (!download || !download.data || !download.data.datosArchivo) {
      console.log("El download.data.loc no existe: ", download);      
      return download;
    }

    const viewPdf = `${download?.data?.datosArchivo ?? ""}` 

    const pdfEmbed = document.createElement('embed')
      pdfEmbed.src = "data:application/pdf;base64,${base64}"
    const imagenEmbed = document.createElement('embed')
      imagenEmbed.src = "data:application/pdf;base64,${base64}"

    const respuesta = parsePdfBase64(viewPdf as string) 
      return setBase64(respuesta)
  }


  return {datosCliente, fullScreen, open, handleClickRow, handleClose, rowSelected, base64}
}