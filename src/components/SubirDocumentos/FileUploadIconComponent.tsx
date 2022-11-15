import { ListItemIcon } from '@mui/material'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DialogComponent from './DialogComponent';

type FileUploadIconComponenteProps = {
  onClick: () => void
}

const FileUploadIconComponent = ({onClick}:FileUploadIconComponenteProps)  => {
  return (
    <>
      <ListItemIcon
        className="flex items-center justify-start"
        onClick={() => onClick()}
        >
          <FileUploadIcon 
            sx={{ fontSize: 30,
            left: "10px",
            pl: 0, 
            color: "#1D428A"
            }}
            />   
      </ListItemIcon>
    </>
  )
}

export default FileUploadIconComponent