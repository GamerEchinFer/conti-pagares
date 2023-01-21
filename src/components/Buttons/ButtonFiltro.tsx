import { Button, ListItem } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

type ButtonFiltroProps = {
  onClick: () => void
}

const ButtonFiltro = ({onClick}: ButtonFiltroProps) => {
    const documentosUser = useSelector((state: RootState) => state.documentosUser.items);    

  return (
    <>
      <div className="pt-8">
        <ListItem>
        <Button
          style={{
            // color: "#ffffff",
            fontWeight: "200",
            fontSize: "16px"
            }}
          variant="outlined"
          size="small"
          sx={{
            ":hover":{background:"#1D428A", color:"#ffffff", fontWeight:"200" }}}
          className="btnFiltro"
          onClick={() => onClick()}
        >
        Depto. de Riesgos
        </Button>
        </ListItem>
      </div>
    </>
  )
}
export default ButtonFiltro