import { 
    Checkbox,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    useMediaQuery 
} from '@mui/material'
import DialogActions from '@mui/material/DialogActions';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { theme } from '../../../theme/Theme';
import BackButton from '../Buttons/BackButton';
import ButtonIconClose from '../Buttons/ButtonIconClose'
import DatosClienteComponent from '../DatosClienteComponent'
import { RootState } from '../../redux/store';
import { capitalize } from '../../helpers/capitalize';
import { useMount } from 'ahooks';
import { getTipoDocumentoAction } from '../../redux/thunks/tipoDocumento.thunks';
import { TipoDocumento, EtiquetaVariableResponse } from '../../interfaces/interfaces';
import { etiquetaVariableActions } from '../../redux/slices/etiquetaVariable.slice';
import AgregarButton from '../Buttons/AgregarButton';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


type ModalAddDocumentProps = { 
    open: boolean
    onClose: () => void
}

function createEtiquetaVariable(data: TipoDocumento): EtiquetaVariableResponse {

    return {
        idTipoDocumento:    data.idTipoDocumento.toString(),
        tipoDocumento:      data.descripcion,
        periodicidad:       data.periodicidad,
        tieneDocumento:     false,
        "datosAdicionales": [
            {
                'idDocumento':              0,
                'codigoTipoDocumento':      0,
                'descripcion':              data.descripcion,
                'codigoEstadoDocumento':    "",
                'fechaEmision':             new Date(),
                'periodo':                  "",
                'numeroOperacion':          "",
                'rutaHadoop':               "",
                'usuarioCarga':             "",
                'fechaRegistro':            new Date(),
                'userAprobador':            "",
                'fechaAprobacion':          new Date(),
                'usuarioVerificador':       "",
                'fechaVerificacion':        "",
            }
        ],                        
        filename:                       "",
    }
}


const ModalAddDocument = ({open, onClose}: ModalAddDocumentProps) => {

    const tipoDocumento = useSelector((state: RootState) => state.tipoDocumento.items);  

    const dispatch = useDispatch();    
    const modalScreend = useMediaQuery(theme.breakpoints.down('xl'));   
    
const [tipoDocumentoSelected, setTipoDocumentoSelected] = useState<TipoDocumento | undefined>(undefined);
    const [documentos, setDocumentos] = useState<EtiquetaVariableResponse[]>([]);


    useMount(() => {
        dispatch(getTipoDocumentoAction())
    })

    const mapDocumentos = (item: EtiquetaVariableResponse) => {
        return (
            <div>
                {/* <p>{item?.datosAdicionales[0]?.descripcion ?? ""}</p> */}
            </div>
        )
    }

  return (
    <>  
        <Dialog
            fullScreen={modalScreend}            
            open={open}
            onClose={onClose}
            aria-labelledby="responsive-dialog-title"
            
            sx={{
                "& .MuiDialog-container": {
                    justifyContent: "flex-center",
                    alignItems: "flex-center",
                    backgroundColor:"white"
                }
            }}

            PaperProps={{ sx: { top: 10, m: 0 , maxWidth: "60%", height: "80%" }}}
        >
            <DialogActions>
                <ButtonIconClose autoFocus={true} onClick={onClose} />
            </DialogActions>
            <DialogTitle id="responsive-dialog-title" className="right-4" >
                <DatosClienteComponent />
            </DialogTitle>
            <DialogContent>                  
            {/* <DialogContentText
                style={{ fontWeight:"600", fontSize:"28px", color:"#1D428A" }}
                className="pl-28 pt-2"
            >
                Tipos de Documentos a añadir
            </DialogContentText> */}
                <div className="flex justify-start pl-28 pt-6">
                {documentos.map(mapDocumentos)}
                <FormControl size="small" sx={{ m: 1, width: 550 }}>
                    <InputLabel 
                        id="demo-simple-select-label"
                        sx={{ fontWeight:"400", fontSize:"16px", color:"#1D428A" }}
                    >
                        Seleccione el tipo desde documento
                    </InputLabel>
                    <Select
                        className="text-left"
                        sx={{ color: "#151515", fontWeight: "400", fontSize:"16px"}}
                        value={tipoDocumentoSelected?.idTipoDocumento}
                        onChange={(event) => {
                            setTipoDocumentoSelected(typeof tipoDocumentoSelected === 'string' ? tipoDocumentoSelected : tipoDocumentoSelected)
                            const idTipoDocumento = Number(event.target?.value ?? 1)

                            tipoDocumento.forEach((item) => {
                                if (idTipoDocumento === item.idTipoDocumento) {
                                    setTipoDocumentoSelected({...item})
                                    const etiquetaVariable = createEtiquetaVariable({...item}) // Mapeo TipoDocumento a Etiqueta Variable
                                    documentos.push(etiquetaVariable)                                                        
                                    dispatch(etiquetaVariableActions.etiquetaVariableAppend(etiquetaVariable))
                                    return
                                }
                            })
                        }}           
                        label="Seleccione el tipo de documento" 
                    >
                        {
                            Array.isArray(tipoDocumento) ? tipoDocumento.map((item) => { // error tipoDocumento.map
                            return (
                                <MenuItem 
                                    key={item.idTipoDocumento}   
                                    value={item.idTipoDocumento}
                                >
                                    {capitalize(`${item.descripcion}`)}
                                    <Checkbox />
                                </MenuItem>
                            )
                        }) : null
                    } 
                    <button>Agregar</button>
                     </Select>
                </FormControl>
                </div>         
                <div className="flex justify-center gap-8">
                    <AgregarButton onClick={onClose} />
                    <BackButton onClick={onClose} />
                </div>
            </DialogContent>
        </Dialog>
    </>
  )
}

export default ModalAddDocument

