import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { getDescargarHadoopDirecto, postAlzarHadoopDirecto } from '../../api/apmDesaApi';

type PDFComponentProps = {
    base64: string
}

const PDFComponent = ({base64}: PDFComponentProps) => {
    const hadoopDirecto = useSelector((state: RootState) => state.hadoopDirecto.response);
    const hadoopDownload = useSelector((state:RootState) => state.hadoopDownload.items);    

    const fileInput = useRef<HTMLInputElement | null>(null);
    const [file, setFile] = useState<File>();
    const [download, setDownload] = useState();
    const [href, setHref] = useState("");
    const [fileName, setFileName] = useState("");
    const [urlPdf, setUrlPdf] = useState("");
    

    const handleClickOpen = async () => {
        // DESCARGAR PDF
        const download = await getDescargarHadoopDirecto(href);

        const hrefPdf = `data:application/pdf;base64,${download?.data?.loc ?? ""}`; 
        setUrlPdf(hrefPdf);           

        // Te permite crear una etiqueta de manera programada o dinamica
        const el = document.createElement("a")
        el.href = hrefPdf
        el.download = fileName
        el.title = "Download pdf"
        el.click()
    }
    const onSubmit = async () => {
        const fileInput = document.getElementById("fileUpload") as HTMLInputElement;
        if(!fileInput || !fileInput.files || !fileInput.files.length || !fileInput.files[0].name) {
            return;
        }
        console.log(fileInput);
              
        const formData = new FormData();        
        formData.append("file", fileInput.files[0]);
        
        const res = await postAlzarHadoopDirecto(formData, "/datalake/Continental/Aprovisionamiento/Datos_no_estruturados/gestion_documental/", false, 65356);

        if (!res || !res.loc) {
            // Alerta
            console.log("El res.loc no existe: ", res);      
            return;
        }

        setHref(res?.loc ?? "")
        setFileName(fileInput.files[0].name)
    }

  return (
    <>
        {
            base64.length > 0 
            ? (
            <embed
                src={base64}
                // src={urlPdf}
                type="application/pdf" width="80%" height="550px"
            />
            )
            : null
        }        
    </> 
  )
}

export default PDFComponent