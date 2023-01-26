import { ListItemIcon } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

type ArrowIconBackProps = {
    onClick: () => void
  }

const ArrowIconBack = ({onClick} : ArrowIconBackProps) => (
    <ListItemIcon className="flex items-center justify-center" sx={{position: "relative"}}>          
        <ArrowBackIosIcon sx={{ fontSize: 24,
        position: "absolute",
        left: "10px",
        pl: 1, 
        color: "#1D428A",
        ":hover": {background: "#1D428A", color: "#ffffff", borderRadius: "80px"}}} 
        onClick={() => onClick()}
        /> 

    </ListItemIcon>
)
export default ArrowIconBack