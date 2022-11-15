import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchbarButton = () => {
  return (
    <>
        <div>
            <Button
              disableRipple
              type='submit'
              color="primary"
              variant="outlined"
              disabled
              className="btnSearch buttonsOutShadow text-white"
              >
                <SearchIcon />
            Buscar
            </Button>
      </div>
    </>
  )
}

export default SearchbarButton