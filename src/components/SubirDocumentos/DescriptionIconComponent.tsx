import DescriptionIcon from '@mui/icons-material/Description';
import { ListItemIcon } from '@mui/material';

const DescriptionIconComponent = () => {
  return (
    <>
    <div className="flex justify-start">
      <ListItemIcon>
          <DescriptionIcon 
            sx={{ fontSize: 35,
            pl: 0, 
            color: "#1D428A" }}
          />
      </ListItemIcon>
    </div>
    </>
  )
}

export default DescriptionIconComponent