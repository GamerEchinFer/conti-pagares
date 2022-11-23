import { Button } from '@mui/material';
import React, { useRef, useState } from 'react'
import FolderIconComponent from './FolderIconComponent';

const DragDropComponent = () => {
    const [files, setFiles] = useState(null);
    const inputRef = useRef<any>(); // HTMLInputElement, HTMLDivElement
    const handleDragOver = (event:any) => {
        event.preventDefault();
    };
    const handleDrop = (event:any) => {
        event.preventDefault();
        console.log(Array.from(event.dataTransfer.files));
        setFiles(event.dataTransfer.files)
    };

    const handleUpload = (event: any) => {

    }

    if (files) return (
        <div className="uploads"> 
            <ul>
                {Array.from(files).map((file: any, idx) => <li key={idx}>{file.name}</li>)}
            </ul>
            <div className="actions">
                <Button
                    onClick={() => setFiles(null)}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleUpload}
                >
                    Upload
                </Button>
            </div>
        </div>
    )
    
  return (
    <>
        {!files && (
            <div className="dropZone"
                onDragOver={handleDragOver}
                onDrop={handleDrop}>
                <input
                type="file"
                multiple
                onChange={(event: any) => setFiles(event.target.files)}
                hidden
                ref={inputRef}
                >
                </input>
                <Button
                    style={{padding:"35px",fontSize:"medium"}}
                    className="dragDropButton" 
                    // variant="outlined"
                    // size="small"
                    onClick={() => inputRef.current.click()}
                    >
                    <FolderIconComponent />
                </Button>
                    <span>Arrastre y suelte sus archivos aquí o Presione click para seleccionar sus archivos</span>
            </div>
        )
        }
    </>
  )
}

export default DragDropComponent