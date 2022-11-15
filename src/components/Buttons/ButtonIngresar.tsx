import { Button } from '@mui/material';
const ButtonIngresar = () => {
  return (
    <>
      <div className="pt-8">
        <Button
          disableRipple
          type='submit'
          color="primary"
          variant="contained"
          className="btnEnter buttonsOutShadow"
        >
        Ingresar
        </Button>
      </div>
    </>
  )
}
export default ButtonIngresar