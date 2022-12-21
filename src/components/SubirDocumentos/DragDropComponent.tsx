import { Button } from '@mui/material';
import React, { useRef, useState, DragEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import DocPDFIcon from './DocPDFIcon';
import FolderIconComponent from './FolderIconComponent';
import { hadoopDirectoActions, hadoopDirecto } from '../../redux/slices/hadoop.slice';
import { RootState } from '../../redux/store';
import { useMount } from 'ahooks';

const DragDropComponent = () => {
    const dispatch = useDispatch()
    const [files, setFiles] = useState(null);
    // const files = useSelector((state: RootState) => state.hadoopDirecto.files)
    const inputRef = useRef<any>(); // HTMLInputElement, HTMLDivElement
    const handleDragOver = (event:any) => {
        event.preventDefault();
    };
    
    useMount(() => {                
        hadoopDirectoActions.setFiles(null)
    })

    const handleDrop = (event:any) => {
        event.preventDefault();
        // console.log(Array.from(event.dataTransfer.files));
        setFiles(event.dataTransfer.files)                              
        
        dispatch(hadoopDirectoActions.setFiles(event.dataTransfer.files))
        
        
    };

    const handleUpload = (event: any) => {

    }

    const onDragStart = (event: DragEvent<HTMLLIElement>, id: any) => {
        console.log(event);
        
        event.dataTransfer.setData('file', id)
        // event.dataTransfer.items.add()
    }

    const onDragEnd = (event: any) => {

    }

    const handleFile = (files: any) => {
        setFiles(files)
        // Aca tambien subimos los archivos
        dispatch(hadoopDirectoActions.setFiles(files))
    }    

    if (files) return (
        <div className="dropZone">              
            <ul>
                {Object.values(files).map((file: any, idx) =>
                 <li key={idx} className="p-2" draggable onDragStart={(event) => onDragStart(event, idx)} onDragEnd={onDragEnd}>
                    <DocPDFIcon />
                    {file.name}
                </li>)}
            </ul>
            {/* <div className="actions">
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
            </div> */}
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
                    onChange={(event) => handleFile(event.target.files)}
                    hidden
                    ref={inputRef}
                    // only PDF
                    accept=".pdf"
                >
                </input>
                <Button
                    style={{padding:"35px",fontSize:"medium", backgroundColor:"#ffffff"}}
                    className="dragDropButton" 
                    // variant="outlined"
                    // size="small"
                    onClick={() => inputRef.current.click()}
                >
                    <FolderIconComponent />
                </Button> 
                <div className="text-center" style={{fontSize:"16px", color:"#1C4289", fontWeight:"400"}}>
                    <span>
                        Arrastre y suelte sus archivos aquí o presione click para seleccionar sus archivos
                    </span>
                </div>
            </div>
        )
        }
    </>
  )
}

export default DragDropComponent