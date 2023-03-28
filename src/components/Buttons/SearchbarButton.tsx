import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

type SearchbarButtonProps = {
  active?: boolean,
  onClick?: () => void
}

const SearchbarButton = ({active = false, onClick}: SearchbarButtonProps) => {
  return (
    <>
        <div>
            <Button
              disableRipple
              type='submit'
              onClick={() => onClick ? onClick() : null}
              variant="outlined"
              disabled={!active}              
              sx={{
                background: active ? "#1D428A" : "#B6B6B6",
                ":hover": {
                  "background": "#1D428A"
                } 
              }}
              style={{color: active ? "white" : "white"} }
              className="btnSearch"
              >
                <SearchIcon />
            Buscar
            </Button>
      </div>
    </>
  )
}

export default SearchbarButton