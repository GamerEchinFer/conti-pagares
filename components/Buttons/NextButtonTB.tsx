import { Button } from '@mui/material';

type NextButtonTBProps = {
  onClick: () => void
}

const NextButtonTB = ({onClick}: NextButtonTBProps) => {
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
          className="btnNextTB"
          onClick={() => onClick()}
        >
        Siguiente
        </Button>
      </div>
    </>
  )
}
export default NextButtonTB