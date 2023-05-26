import { Button } from '@mui/material';

type NextButtonTBProps = {
  onClick: () => void,
  disabled?: boolean,
}

const NextButtonTB = ({onClick, disabled = false}: NextButtonTBProps) => {
  return (
    <>
      <div className="pt-8">
        <Button
          style={{
            color: "#ffffff",
            fontWeight: "400",
            fontSize: "16px"
          }}
          disabled={disabled}
          disableRipple
          variant="outlined"
          size="small"
          sx={{
            background: !disabled ? "#1D428A" : "#B6B6B6",
            ":hover": {
              "background": "#1D428A"
            } 
          }}
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