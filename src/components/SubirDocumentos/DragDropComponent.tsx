import { Button } from '@mui/material';
import React, { useRef, useState, DragEvent, memo } from 'react'
import { useDispatch } from 'react-redux';
import DocPDFIcon from './DocPDFIcon';
import FolderIconComponent from './FolderIconComponent';
import { hadoopDirectoActions } from '../../redux/slices/hadoop.slice';
import { useMount } from 'ahooks';
import ButtonDelete from '../Buttons/ButtonDelete';

const DragDropComponent = memo(() => {
    const dispatch = useDispatch();
    const [files, setFiles] = useState<any[] | null>(null);
    const inputRef = useRef<any>();

    const handleDragOver = (event: any) => {
        event.preventDefault();
    };

    useMount(() => {
        hadoopDirectoActions.setFiles(null)
    });

    const handleDrop = (event: any) => {
        event.preventDefault();
        setFiles(event.dataTransfer.files)
        dispatch(hadoopDirectoActions.setFiles(event.dataTransfer.files))
    };

    const onDragStart = (event: DragEvent<HTMLElement>, id: any) => {
        console.log(event);

        event.dataTransfer.setData('file', id)
    }

    const onDragEnd = (event: any) => {

    }

    const handleFile = (files: any) => {
        setFiles(files)
        dispatch(hadoopDirectoActions.setFiles(files))
    }

    if (files) return (
        <div className="dropZoneSecondary">
            {Object.values(files).map((file: any, index) =>
                <div key={index} draggable onDragStart={(event) => onDragStart(event, index)} onDragEnd={onDragEnd}>
                    <div className="absolute">
                        <ButtonDelete onClick={() => {
                            const newFiles = [...files]
                            newFiles.splice(index, 1)
                            setFiles(newFiles.length === 0 ? null : newFiles)
                        }} />
                    </div>
                    <DocPDFIcon />
                    <div style={{ fontSize: "12px" }}>{file.name}</div>
                </div>
            )}
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
                        accept=".pdf"
                    >
                    </input>
                    <Button
                        style={{ padding: "35px", fontSize: "medium", backgroundColor: "#ffffff" }}
                        className="dragDropButton"
                        onClick={() => inputRef.current.click()}
                    >
                        <FolderIconComponent />
                    </Button>
                    <div className="text-center" style={{ fontSize: "16px", color: "#1C4289", fontWeight: "400" }}>
                        <span>
                            Arrastre y suelte sus archivos aquí o presione click para seleccionar sus archivos
                        </span>
                    </div>
                </div>
            )
            }
        </>
    )
})

export default DragDropComponent