import { ListItemIcon } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

type ArrowIconNextProps = {
    onClick: () => void
  }

const ArrowIconNext = ({onClick} : ArrowIconNextProps) => (
    <ListItemIcon className="flex items-center justify-center" sx={{position: "relative"}}>        
        <ArrowForwardIosIcon sx={{ fontSize: 24,
        position: "absolute",
        left: "10px",
        pl: 1, 
        color: "#1D428A",
        ":hover": {background: "#1D428A", color: "#ffffff", borderRadius: "80px", cursor: "pointer"}}}
        onClick={() => onClick()}
        />
    </ListItemIcon>
)


export default ArrowIconNext