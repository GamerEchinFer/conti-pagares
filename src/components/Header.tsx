import { Box } from '@mui/material'
const Header = () => {
  return (
    <>
      <Box className="header" style={{height: 70, display: 'flex', justifyContent: 'center', background: '#1D428A', width: '100%'}}>
        <div className="flex flex-wrap justify-center">
          <img
            src="@/assets/principal-fondo-azul.png"
            className="max-w-sm h-auto transition-shadow ease-in-out duration-300 shadow-none hover:shadow-xl"
            alt=""
          />
        </div>
      </Box> 
    </>
  )
}

export default Header