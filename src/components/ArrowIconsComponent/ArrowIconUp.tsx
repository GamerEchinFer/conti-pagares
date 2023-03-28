import { ListItemIcon } from '@mui/material'
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';

type ArrowIconUpProps = {
  onClick: () => void
  }

const ArrowIconUp = ({onClick} : ArrowIconUpProps) => (
  <div className="pl-80">
    <div className="pl-80 ">
      <ExpandLessOutlinedIcon 
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
export default ArrowIconUp