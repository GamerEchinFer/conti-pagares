import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

type SearchbarButtonProps = {
  active?: boolean
}

const SearchbarButton = ({active = false}: SearchbarButtonProps) => {
  return (
    <>
        <div>
            <Button
              disableRipple
              type='submit'
              color="primary"
              variant="outlined"
              disabled={!active}              
              sx={{background: active ? "#1D428A" : "#B6B6B6"}}
              style={{color: active ? "white" : "white"}}
              className="btnSearch  text-white"
              >
                <SearchIcon />
            Buscar
            </Button>
      </div>
    </>
  )
}

export default SearchbarButton