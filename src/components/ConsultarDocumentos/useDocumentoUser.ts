import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { theme } from "../../../theme/Theme";
import { getDescargarHadoopDirecto } from "../../api/apmDesaApi";
import { parsePdfBase64 } from "../../helpers/cutPdf";
import { ColeccionDocumento } from "../../interfaces/interfaces";
import { RootState } from "../../redux/store";

export const useDocumentUser = () => {
    const datosCliente = useSelector((state: RootState) => state.clienteDatos.items);

  const fullScreen = useMediaQuery(theme.breakpoints.down('xl'));

  const [open, setOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState<ColeccionDocumento | undefined>(undefined)  
  const [base64, setBase64] = useState("")

  const handleClose = () => {        
    setOpen(false);
  }

  const handleClickRow = async (row: ColeccionDocumento) => {        
    setRowSelected(row)
    setOpen(true);

    const rutaHadoop = row.datosAdicionales.rutaHadoop;

    const download = await getDescargarHadoopDirecto(rutaHadoop);

    if (!download || !download.data || !download.data.loc) {
      // Alerta
      console.log("El download.data.loc no existe: ", download);      
      return;
    }

    const viewPdf = `${download?.data?.loc ?? ""}` 

    setBase64(parsePdfBase64(viewPdf as string))
  }

  return {datosCliente, fullScreen, open, handleClickRow, handleClose, rowSelected, base64}
}