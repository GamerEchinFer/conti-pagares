import { useState, useEffect } from 'react';
import ProductosComponent from '../NuevaSolicitud/ProductosComponent';
import ArrowIconBack from '../ArrowIconsComponent/ArrowIconBack';
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
import { getProductosAction } from '../../redux/thunks/producto.thunks';

const initialBody = (body?: EtiquetaVariableBody) => ({
  ...body
})

type NuevaSolicitudComponentProps = {
  solicitud: SolicitudCliente | null
}

function  NuevaSolicitudComponent({solicitud}: NuevaSolicitudComponentProps) {
  const clienteDatos = useSelector((state: RootState) => state.clienteDatos.items);
  const router = useRouter();
  const dispatch = useDispatch(); 

  const loadingParametrosSelect = useSelector((state: RootState) => state.parametro.loading);
  const loadingSubProducto = useSelector((state: RootState) => state.subProducto.loading);
  const etiquetaVariableSuccess = useSelector((state: RootState) => state.etiquetaVariable.success);
  const etiquetaVariableBody = useSelector((state: RootState) => state.etiquetaVariable.etiquetaVariableBody);
  const [nuevaSolicitud, setNuevaSolicitud] = useState(0);
  const [idProducto, setIdProducto] = useState(0);
  const [idSubProducto, setIdSubProducto] = useState(0);
  const [isChangeSelected, setIsChangeSelected] = useState(false);

  const [body, setBody] = useState<EtiquetaVariableBody>({})

  const solicitudes = useSolicitudes()

  const handleChangeNuevaSolicitud = (event : any) =>  
  setNuevaSolicitud(event.target.value);

  useEffect(() => {
    dispatch(etiquetaVariableActions.etiquetaVariableResponseReset())
    dispatch(etiquetaVariableActions.etiquetaVariableBodyReset())
  }, [])

  useEffect(() => {    
    if (clienteDatos && clienteDatos.codigoCliente) {                  
      const itemCodigoCliente = {nombre: "codigoCliente", valor: clienteDatos.codigoCliente}    
      const itemTipoPersona = {nombre: "tipo_persona", valor: clienteDatos.tipoPersona}    
      
      setBody({
        ...body, 
        [itemCodigoCliente.nombre]: itemCodigoCliente,
        [itemTipoPersona.nombre]: itemTipoPersona
      })
    }    
  }, [])  

  useEffect(() => {
    dispatch(getProductosAction(idProducto)) 
    dispatch(parametroActions.parametroSuccess({})) 
  }, [])

  useEffect(() => {
    if (idProducto) {
      dispatch(getSubProductosAction(idProducto))
      console.log(idProducto)
    }
  }, [idProducto])

  useEffect(() => {
    if (idProducto && idSubProducto) {
      dispatch(getParametroAction(idProducto, idSubProducto))
    }
  }, [idSubProducto])

  if(!solicitud) return null;

  const handleIconBack = () => {
    dispatch(solicitudActions.setPage(-1))
  }

  const agregarNombreValor = (nombre: string, valor: string) => {
    
    const item = {nombre, valor}
    
    const newBody = {...body, [nombre]: item}

    setBody(newBody)

    setIsChangeSelected(true)
    dispatch(postEtiquetasVariablesAction(Object.values(newBody)));    
  }

  const handleClickNext = () => {
    localStorage.setItem("etiquetas-variable-body", JSON.stringify(body));
    dispatch(getNumeroLegajoAction());
    dispatch(etiquetaVariableActions.etiquetaVariableResponseReset); 
    router.push('/subirDocumento');
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
          {<ProductosComponent 
            idProducto={idProducto}
            setIdProducto={(id: any) => {
              agregarNombreValor("id_producto", `${id}`)
              setIdProducto(id)
            }}
          />}
          
            {
              loadingSubProducto 
              ? (
                <div className='flex justify-center pt-10 pb-10 w-200'>
                  <LoadingIcon />
                </div>
              ) 
              : null
            }
          {idProducto !== 0 ? (
            <SubProductosComponent 
              idSubProducto={idSubProducto}
              setIdSubProducto={(id: any) => {
                agregarNombreValor("id_subproducto", `${id}`)
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