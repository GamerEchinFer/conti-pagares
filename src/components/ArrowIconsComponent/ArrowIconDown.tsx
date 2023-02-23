import { ListItemIcon } from '@mui/material'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';

type ArrowIconDownProps = {
  onClick: () => void
  }

const ArrowIconDown = ({onClick} : ArrowIconDownProps) => (
  // <ListItemIcon className="" sx={{}}>          
    // <button className="" style={{
    //   right: 0,
    //   top: 5,
    //   bottom: 0,
    //   left: 10,
    // }}>
    <div className="">
      <ExpandMoreOutlinedIcon
        sx={{ 
          background: "#1D428A",
          color: "#ffffff",
          borderRadius: "80px"
        }} 
        onClick={() => onClick()}
      />
    </div>
        // </button> 
  // </ListItemIcon>
)
export default ArrowIconDown