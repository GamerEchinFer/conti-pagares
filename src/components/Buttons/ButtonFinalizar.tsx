import { Button } from '@mui/material';

type ButtonFinalizarProps = {
  onClick: () => void
}

const ButtonFinalizar = ({onClick}: ButtonFinalizarProps) => {
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
          className="btnNext"
          onClick={()=> onClick()}
        >
        Finalizar
        </Button>
      </div>
    </>
  )
}
export default ButtonFinalizar