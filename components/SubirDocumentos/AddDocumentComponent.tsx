import { Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const AddDocumentComponent = () => {
    const hadoopDirecto = useSelector((state: RootState) => state.hadoopDirecto.response);
    const hadoopDownload = useSelector((state:RootState) => state.hadoopDownload.items);

    const fileInput = useRef<HTMLInputElement | null>(null);
    const [file, setFile] = useState<File>();
    const [download, setDownload] = useState();

    const handleClickOpen = () => {

    }
    const onSubmit = async () => {
        const fileInput = document.getElementById("fileUpload") as HTMLInputElement;
        if(!fileInput || !fileInput.files || !fileInput.files[0].name) {
            return;
        }
        console.log(fileInput);
        
        // const miVariable:  = 10

        const params: {
            path_images: string,
            overwrite: boolean,
            chunk_size: number,            
        } = {
            path_images: "",
            overwrite: false,
            chunk_size: 0,            
        }

        const formData = new FormData();
        // formData.append("file",fileInput?.files?.item(0) as File);
        formData.append("file", fileInput.files[0]);
        console.log(formData);
 
        const res = await axios.post('http://10.6.3.84:5051/upload?path_images',
        formData, { params,
            headers: {
                'Content-Type':'multipart/form-data',
                // 'Subscription-Key': '2d489b65ea374662b3c6c6929dd62f9a'
            }
        }).then(res => {console.log(res.data);
         
    });

    }

  return (
    <>
        <pre>{JSON.stringify(hadoopDirecto, null, 2)}</pre>
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
        </div>

        <pre>{JSON.stringify(hadoopDownload, null, 2)}</pre>

        <div className="flex justify-start">
            <h1 className="pt-4 pl-4">Download Document</h1>
                <div className="flex  justify-center p-10" >
                    <Button onClick={handleClickOpen}>
                        Download
                    </Button>
                </div>
        </div>
    </> 
  )
}

export default AddDocumentComponent