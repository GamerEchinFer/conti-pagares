import { Button } from '@mui/material';

type ButtonVerSolicitudProps = {
  onClick: () => void
}

const ButtonVerSolicitud = ({onClick}: ButtonVerSolicitudProps) => {
  

  return (
    <>
      <div className="pt-8">
        <Button
          disableRipple
          variant="outlined"
          className="btnVerSolicitud"
          onClick={() => onClick()}
        >
        Ver solicitud
        </Button>
      </div>
    </>
  )
}
export default ButtonVerSolicitud