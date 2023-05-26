import { Button } from '@mui/material';

type MoreViewButtonProps = {
  onClick: () => void
}

const MoreViewButton = ({onClick}: MoreViewButtonProps) => {
  

  return (
    <>
      <div className="pt-8">
        <Button
          disableRipple
          variant="outlined"
          className="btnMoreView"
          onClick={() => onClick()}
        >
        Ver más
        </Button>
      </div>
    </>
  )
}
export default MoreViewButton