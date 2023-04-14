import { Button } from '@mui/material';
import React, { useRef, useState, DragEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import DocPDFIcon from './DocPDFIcon';
import FolderIconComponent from './FolderIconComponent';
import { hadoopDirectoActions, hadoopDirecto } from '../../redux/slices/hadoop.slice';
import { RootState } from '../../redux/store';
import { useMount } from 'ahooks';
import ButtonDelete from '../Buttons/ButtonDelete';

const DragDropComponent = () => {
    const dispatch = useDispatch();
    const [files, setFiles] = useState<any[] | null>(null);
    const inputRef = useRef<any>();
    
    const handleDragOver = (event:any) => {
        event.preventDefault();
    };
    
    useMount(() => {                
        hadoopDirectoActions.setFiles(null)
    });

    const handleDrop = (event:any) => {
        event.preventDefault();
        setFiles(event.dataTransfer.files)                              
        
        dispatch(hadoopDirectoActions.setFiles(event.dataTransfer.files))
    };

    const onDragStart = (event: DragEvent<HTMLElement>, id: any) => {
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
        <div className="dropZoneSecondary">
            <div className="grid grid-cols-4 gap-4">
              {Object.values(files).map((file: any, index) =>
                 <div className="static" key={index} draggable onDragStart={(event) => onDragStart(event, index)} onDragEnd={onDragEnd}>
                        <div className="absolute">
                            <ButtonDelete onClick={() => {                                
                                // Indicamos el indice a eliminar y el segundo parametro cantidad de elementos a partir del indice
                                const newFiles = [...files]
                                newFiles.splice(index, 1)                                                                
                                setFiles( newFiles.length === 0 ? null : newFiles)                                          
                            }} />
                        </div> 
                        <DocPDFIcon />
                        <div style={{fontSize:"12px"}}>{file.name}</div> 
                </div>)}  
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