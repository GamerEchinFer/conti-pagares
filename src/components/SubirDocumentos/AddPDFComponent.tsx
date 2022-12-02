import { Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { getDescargarHadoopDirecto, postAlzarHadoopDirecto } from '../../api/apmDesaApi';

type AddPDFComponentProps = {
    base64: string
}

const AddPDFComponent = ({base64}: AddPDFComponentProps) => {
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
        const download = await getDescargarHadoopDirecto(href)
        // console.log("El PDF: " + download.data.LOC);

        const hrefPdf = `data:application/pdf;base64,${download.data.LOC}` 
        setUrlPdf(hrefPdf)           

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
 
        // SUBIR PDF POR ALGUNA RAZON FUNCIONA DA ERROR SI PONES SUBSCRIPTION KEY
        const res = await postAlzarHadoopDirecto(formData, "", false, 255);

        setHref(res.LOC)
        setFileName(fileInput.files[0].name)
    }

  return (
    <>
        {/* <pre>{JSON.stringify(hadoopDirecto, null, 2)}</pre>
        <div className="flex  justify-center p-10">
            Up Document...
            <div className="flex justify-start">
                <input 
                    type="file"
                    id="fileUpload"
                    ref={fileInput}
                />
                <Button onClick={onSubmit}>
                    Subir
                </Button> 
            </div>
        </div> */}

        {/* <pre>{JSON.stringify(hadoopDownload, null, 2)}</pre> */}

        {/* <div className="flex justify-start">
            <h1 className="pt-4 pl-4">Download Document</h1>
                <div className="flex  justify-center p-10" >
                    <Button onClick={handleClickOpen}>
                        Download
                    </Button>
                </div>


        </div>   */}
        {/*{base64}*/}  
        {
            // urlPdf.length > 0 
            base64.length > 0 
            ? (<embed
                src={base64}
                // src={urlPdf}
                type="application/pdf" width="100%" height="600px"/>)
            : null
        }        
    </> 
  )
}

export default AddPDFComponent