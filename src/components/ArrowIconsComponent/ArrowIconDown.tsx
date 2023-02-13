import { ListItemIcon } from '@mui/material'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';

type ArrowIconDownProps = {
  onClick: () => void
  }

const ArrowIconDown = ({onClick} : ArrowIconDownProps) => (
  <ListItemIcon className="flex items-center justify-end" sx={{position: "relative", height: "40px", width:"600px"}}>          
    <button>
      <ExpandMoreOutlinedIcon
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
export default ArrowIconDown