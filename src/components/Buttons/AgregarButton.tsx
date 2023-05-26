import { Button } from '@mui/material';
import { CSSProperties } from 'react';

const text: CSSProperties = {
  color: "#1D428A",
  fontWeight: "400",
  fontSize: "16px"
};

type AgregarButtonProps = {
  onClick: () => void
}

const AgregarButton = ({onClick}: AgregarButtonProps) => {
  

  return (
    <>
      <div className="pt-8">
        <Button
          style={text}
          disableRipple
          variant="outlined"
          className="btnBack"
          onClick={() => onClick()}
        >
        Agregar
        </Button>
      </div>
    </>
  )
}
export default AgregarButton