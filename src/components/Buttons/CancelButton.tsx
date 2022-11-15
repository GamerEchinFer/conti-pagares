import { Button } from '@mui/material';

type CancelButtonProps = {
  onClick: () => void
}

const CancelButton = ({onClick}: CancelButtonProps) => {
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
export default CancelButton