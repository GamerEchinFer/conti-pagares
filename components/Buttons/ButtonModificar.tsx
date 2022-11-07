import { Button } from '@mui/material';

type ButtonModificarProps = {
  onClick: () => void
}

const ButtonModificar = ({onClick}: ButtonModificarProps) => {
  return (
    <>
      <div className="pt-8">
        <Button
          style={{
            color: "#ffffff",
            fontWeight: "400",
            fontSize: "16px"
          }}
          disableRipple
          variant="outlined"
          size="small"
          className="btnConfirmar"
          onClick={()=> onClick()}
        >
        Modificar
        </Button>
      </div>
    </>
  )
}
export default ButtonModificar