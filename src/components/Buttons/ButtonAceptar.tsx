import { Button } from '@mui/material';

type ButtonAceptarProps = {
  onClick: () => void,
  autoFocus: boolean
}

const ButtonAceptar = ({onClick}: ButtonAceptarProps) => {
  return (
    <>
      <div>
        <Button
          style={{
            color: "#ffffff",
            background: "#1D428A",
            fontWeight: "400",
            fontSize: "16px"
          }}
          disableRipple
          variant="outlined"
          size="small"
          onClick={()=> onClick()}
        >
        Aceptar
        </Button>
      </div>
    </>
  )
}
export default ButtonAceptar