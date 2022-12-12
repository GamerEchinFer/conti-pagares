import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import DatosClienteComponent from '../DatosClienteComponent'
import DescriptionIconComponent from './DescriptionIconComponent'

const HeaderDocComponent = () => {
  const dispatch = useDispatch();
  const numeroLegajo = useSelector((state: RootState) => state.numeroLegajo.items);

  return (
    <>
      <div 
        className="max-w-md mx-auto md:max-w-2xl pb-2 pt-6"
        style={{fontSize:"24px", color:"#1D428A", fontWeight:"400"}}>
          <DatosClienteComponent />
          <div className="md:flex pt-6">
            <DescriptionIconComponent />
              <span className="pl-2">Subir documentos</span>
          </div>

      <div className="pt-2 text-left" style={{fontSize:"18px", color:"#707070", fontWeight:"400"}}>
        <span className="mt-2">También podés subir todos los documentos de una vez al panel lateral,
        y luego asociarlos a cada etiqueta según corresponda.</span>
      </div>
      </div>
    </>

  )
}

export default HeaderDocComponent