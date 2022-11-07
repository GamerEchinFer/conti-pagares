import { Button } from '@mui/material';

type ButtonConfirmarProps = {
  onClick: () => void
}

const ButtonConfirmar = ({onClick}: ButtonConfirmarProps) => {
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
        Confirmar
        </Button>
      </div>
    </>
  )
}
export default ButtonConfirmar