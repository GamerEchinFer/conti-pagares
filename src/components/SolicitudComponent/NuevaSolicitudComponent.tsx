import { useState, useEffect } from 'react';
import ProductosComponent from '../NuevaSolicitud/ProductosComponent';
import ArrowIconBack from '../ArrowIconsComponent/ArrowIconBack';
import FormularioNuevaSolicitud from '../NuevaSolicitud/FormularioNuevaSolicitud';
import SubProductosComponent from '../NuevaSolicitud/SubProductosComponent';
import { useDispatch, useSelector } from 'react-redux';
import ParametroSelectComponent from '../NuevaSolicitud/ParametroSelectComponent';
import NextButton from '../Buttons/NextButton';
import { useSolicitudes } from '../../hooks/useSolicitudes';
import { EtiquetaVariableBody, SolicitudCliente } from '../../interfaces/interfaces';
import { etiquetaVariableActions } from '../../redux/slices/etiquetaVariable.slice';
import { parametroActions } from '../../redux/slices/parametro.slice';
import { RootState } from '../../redux/store';
import { postEtiquetasVariablesAction } from '../../redux/thunks/etiqueta.thunk';
import { getParametroAction } from '../../redux/thunks/parametro.thunks';
import { getSubProductosAction } from '../../redux/thunks/subProducto.thunks';
import { useRouter } from 'next/router';
import { solicitudActions } from '../../redux/slices/solicitud.slice';
import { getNumeroLegajoAction } from '../../redux/thunks/numeroLegajo.thunks';
import LoadingIcon from '../shared/LoadingIcon';

type NuevaSolicitudComponentProps = {
  solicitud: SolicitudCliente | null
}

function  NuevaSolicitudComponent({solicitud}: NuevaSolicitudComponentProps) {

  const router = useRouter();
  // STATES
  const dispatch = useDispatch(); 

  const loadingParametrosSelect = useSelector((state: RootState) => state.parametro.loading);
  const etiquetaVariableSuccess = useSelector((state: RootState) => state.etiquetaVariable.success);
  // const idProducto = useSelector((state: RootState) => state.solicitud.idProducto);
  // const idSubProducto = useSelector((state: RootState) => state.solicitud.idSubProducto);

  const [nuevaSolicitud, setNuevaSolicitud] = useState(0);
  const [idProducto, setIdProducto] = useState(0);
  const [idSubProducto, setIdSubProducto] = useState(0);
  const [isChangeSelected, setIsChangeSelected] = useState(false)

  const [body, setBody] = useState<EtiquetaVariableBody>({
    codigoCliente: {
      "nombre": "codigoCliente",
      "valor": "000666"
    },
    tipo_persona: {
      "nombre": "tipo_persona",
      "valor": "F"
    },
    id_producto: {
      "nombre": "id_producto",
      "valor": "7"
    },
    id_subproducto: {
      "nombre": "id_subproducto",
      "valor": "146"
    },
    id_actividad: {
      "nombre": "id_actividad",
      "valor": "1"
    },
    id_riesgo: {
      "nombre": "id_riesgo",
      "valor": "4"
    },
    id_destino: {
      "nombre": "id_destino",
      "valor": "1"
    },
    
  })

  const solicitudes = useSolicitudes()

  const handleChangeNuevaSolicitud = (event : any) =>  
  setNuevaSolicitud(event.target.value);

  useEffect(() => {
    // Clean or Clear    
    dispatch(parametroActions.parametroSuccess({}))
  }, [])


  // CUANDO TRAE LAS ETIQUETAS VARIABLES CORRECTAMENTE SE VA A LA SIGUIENTE PANTALLA
  useEffect(() => {
    if (etiquetaVariableSuccess) {
      router.push('/subirDocumento');
    }

    return () => {
      dispatch(etiquetaVariableActions.etiquetaVariableReset())
    }
  }, [etiquetaVariableSuccess])

  useEffect(() => {

    // Cada vez que el estado id producto cambia se vuelve a ejecutar este codigo 

    if (idProducto) {
      dispatch(getSubProductosAction(idProducto))
    }
  }, [idProducto])

  useEffect(() => {

    // Cada vez que el estado id subproducto cambia se vuelve a ejecutar este codigo 

    if (idProducto && idSubProducto) {
      dispatch(getParametroAction(idProducto, idSubProducto))
    }
  }, [idSubProducto])

  if(!solicitud) return null;

  const handleClickNext = () => {
    dispatch(postEtiquetasVariablesAction(Object.values(body)));
    dispatch(etiquetaVariableActions.setEtiquetaVariableBody(body))
    // True si cambia la combinacion de productos and false si no cambia

    if (isChangeSelected) {
      dispatch(getNumeroLegajoAction());
      // dispatch(postEtiquetasVariablesAction().setEtiquetaVariableBody(body));
    }
    
    router.push('/subirDocumento');
  }

  const handleIconBack = () => {
    // router.push('/solicitud');
    dispatch(solicitudActions.setPage(-1))
  }

  const agregarNombreValor = (nombre: string, valor: string) => {

    const item = {nombre, valor}    

    setBody({...body, [nombre]: item})

    setIsChangeSelected(true)
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-2 pt-4">
        <div 
          className="text-left pl-5"
          style={{
            color: "#1D428A",
            fontWeight: "bold",
            fontSize:"24px"
          }}
        >
          Nueva Solicitud
        </div>  
        <div className="relative">
          <div className="absolute top-1 right-0 h-16" style={{paddingLeft: "70px"}}>
            <ArrowIconBack onClick={handleIconBack}/>
          </div>
        </div>
      </div>
        <div 
          className="text-left pl-5"
          style={{
            color: "#6C6C6C",
            fontWeight: "400",
            fontSize:"18px"
          }}
        >
          Para cargar documentos a partir de una solicitud de productos
        </div> 
        <div className="pt-8">
          {/* {idProducto} */}
          
          {/* {idProducto === 0 ? <ProductosComponent 
            idProducto={idProducto}
            setIdProducto={setIdProducto}
          /> : items[idProducto]} */}

          {<ProductosComponent 
            idProducto={idProducto}
            setIdProducto={(id: any) => {
              agregarNombreValor("id_producto", `${id}`)
              // dispatch(solicitudActions.setIdProducto(id))
              setIdProducto(id)
              
            }}
          />}
          
          {idProducto !== 0 ? (
            
              <SubProductosComponent 
              idSubProducto={idSubProducto}
              setIdSubProducto={(id: any) => {
                agregarNombreValor("id_subproducto", `${id}`)
                // dispatch(solicitudActions.setIdSubProducto(id))
                setIdSubProducto(id)
              }}            
              /> 
           ) : null}
           
            {
              loadingParametrosSelect 
              ? (
                <div className='flex justify-center pt-10 pb-10 w-200'>
                  <LoadingIcon />
                </div>
              ) 
              : null
            }
              
              <ParametroSelectComponent onChange={(nombre: string, id: any) => {
                agregarNombreValor(`id_${nombre}`, `${id}`)
              }} />

              
            </div>  
            <div className="flex flex-row justify-center">
              <NextButton onClick={handleClickNext} />
            </div>
    </>
  ) 
}
export default NuevaSolicitudComponent