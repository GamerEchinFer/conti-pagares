import { 
    Dialog,
    DialogContent,
    DialogContentText,
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
import SaveListButton from '../Buttons/SaveListButton';

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
    
    const [tipoDocumentoSelected, setTipoDocumentoSelected] = useState<TipoDocumento | undefined>(undefined)
    const [documentos, setDocumentos] = useState<EtiquetaVariableResponse[]>([])
    
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

            PaperProps={{ sx: { top: 10, m: 0 , maxWidth: "80%", height: "80%" }}}
        >
            <DialogActions>
                <ButtonIconClose autoFocus={true} onClick={onClose} />
            </DialogActions>
            <DialogTitle id="responsive-dialog-title" className="right-4" >
                <DatosClienteComponent />
            </DialogTitle>
            <DialogContent>                  
            <DialogContentText
                style={{ fontWeight:"600", fontSize:"28px", color:"#1D428A" }}
                className="pl-28 pt-2"
            >
                Tipos de Documentos a añadir
            </DialogContentText>
                <div className="flex justify-start pl-28 pt-6">
                {documentos.map(mapDocumentos)}
                <FormControl size="small" sx={{ minWidth: 670}} >
                    <InputLabel id="demo-simple-select-label">Seleccione el tipo de documento</InputLabel>
                    <Select
                        className="text-left"
                        sx={{ color: "#151515", fontWeight: "400", fontSize:"16px" }}
                        value={tipoDocumentoSelected?.idTipoDocumento}
                        onChange={(event) => {

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
                            tipoDocumento.map((item) => {
                            return <MenuItem key={item.idTipoDocumento} value={item.idTipoDocumento} >{capitalize(`${item.descripcion}`)}</MenuItem>
                            })
                        } 
                    </Select>
                </FormControl>
                </div>         
                <div className="flex justify-center gap-8">
                    <SaveListButton onClick={onClose} />
                    <BackButton onClick={onClose} />
                </div>
            </DialogContent>
        </Dialog>
    </>
  )
}

export default ModalAddDocument

