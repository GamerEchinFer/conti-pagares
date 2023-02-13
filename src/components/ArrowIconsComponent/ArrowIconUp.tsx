import { ListItemIcon } from '@mui/material'
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';

type ArrowIconUpProps = {
  onClick: () => void
  }

const ArrowIconUp = ({onClick} : ArrowIconUpProps) => (
  <ListItemIcon className="flex items-center justify-end" sx={{position: "relative" ,height: "40px", width:"600px"}}>          
    <button>
      <ExpandLessOutlinedIcon 
        sx={{ 
          position: "absolute",
          right: 0,
          top: 20,
          bottom: 0,
          // color: "#1D428A",
          // ":hover": {background: "#1D428A", color: "#ffffff", borderRadius: "80px"}
          background: "#1D428A",
          color: "#ffffff",
          borderRadius: "80px"
        }} 
        onClick={() => onClick()}
      />
    </button> 
  </ListItemIcon>
)
export default ArrowIconUp