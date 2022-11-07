import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';

import { ListItemIcon } from '@mui/material';

const FolderIconComponent = () => {
  return (
    <>
    <div className="flex justify-center">
      <ListItemIcon>
          <FolderOpenOutlinedIcon 
            sx={{ fontSize: 120,
            pl: 0,
            color: "#1D428A",
            }}
          />
      </ListItemIcon>
    </div>
    </>
  )
}

export default FolderIconComponent