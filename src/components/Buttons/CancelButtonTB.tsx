import { Button } from '@mui/material';

type CancelButtonTBProps = {
  onClick: () => void
}

const CancelButtonTB = ({onClick}: CancelButtonTBProps) => {
  return (
    <>
      <div className="pt-8">
        <Button
          style={{
            color: "#1D428A",
            fontWeight: "400",
            fontSize: "16px"
          }}
          disableRipple
          variant="outlined"
          size="small"
          className="btnCancel"
          onClick={() => onClick()}
        >
        Cancelar
        </Button>
      </div>
    </>
  )
}
export default CancelButtonTB