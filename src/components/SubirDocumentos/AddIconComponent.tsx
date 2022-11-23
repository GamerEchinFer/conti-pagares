import React from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { ListItemIcon } from '@mui/material';


type AddIconComponentProps = {
  onClick: () => void
}

const AddIconComponent = ({onClick}: AddIconComponentProps) => {
  return (
    <>
      <ListItemIcon
        className="flex items-center justify-center pt-2 pb-2"
        onClick={() => onClick()}
      >
        <AddCircleIcon
          sx={{
            fontSize:40,
            left: 1,
            color:"#1D428A"
            }}    
          />
      </ListItemIcon>
    </>
  )
}

export default AddIconComponent