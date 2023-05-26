import { ListItemIcon } from '@mui/material'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';

type ArrowIconDownProps = {
  onClick: () => void
  }

const ArrowIconDown = ({onClick} : ArrowIconDownProps) => (
  <div className="pl-80">
    <div className="pl-80 ">
      <ExpandMoreOutlinedIcon
        sx={{ 
          background: "#1D428A",
          color: "#ffffff",
          borderRadius: "80px"
        }} 
        onClick={() => onClick()}
      />  
    </div>
  </div>
)
export default ArrowIconDown