import { Button } from '@mui/material';

type ButtonCargarProps = {
  onClick: () => void
}

const ButtonCargar = ({onClick}: ButtonCargarProps) => {
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
        Cargar
        </Button>
      </div>
    </>
  )
}
export default ButtonCargar