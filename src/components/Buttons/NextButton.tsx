import { Button } from '@mui/material';

type NextButtonProps = {
  onClick: () => void
}

const NextButton = ({onClick}: NextButtonProps) => {
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
        Siguiente
        </Button>
      </div>
    </>
  )
}
export default NextButton