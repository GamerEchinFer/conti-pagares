import { useMount } from 'ahooks';
import moment from 'moment';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { EtiquetaVariableResponse, GuardarDocumentoRequest, IGuardarDocumento } from '../interfaces/interfaces';
import { base64ToFile } from '../helpers/base64ToFile';
import { postGuardarDocumento, postSubirMsFileStream } from '../api/apmDesaApi';
import { storage } from '../helpers/storage';
import { ID_PRODUCTO_PROMISSORY_NOTES, ID_SUB_PRODUCTO_PROMISSORY_NOTES, ID_TIPO_DOCUMENTO_PROMISSORY_NOTES } from '../constants/promissoryNotes/accusationConfig';
import { hadoopDirectoSelectors } from '../redux/slices/hadoop.slice';
// import { postGuardarDocumento, postSubirMsFileStream } from '../../../api/apmDesaApi';
// import { base64ToFile } from '../../../helpers/base64ToFile';
// import { storage } from '../../../helpers/storage';
// import { EtiquetaVariableResponse, GuardarDocumentoRequest } from '../../../interfaces/interfaces';
// import { RootState } from '../../../redux/store';
// export interface IGuardarDocumento{
//     base64Modified: string;
//     filename: string;
// }

export const useDocumento = () => {
    // const clienteDatos = useSelector((state: RootState) => state.clienteDatos.items);
    const usuarios = useSelector((state: RootState) => state.auth.datosAgente);
    // const numeroDeLegajo = useSelector((state: RootState) => state.numeroLegajo.items);
    const filesStreamData = useSelector(hadoopDirectoSelectors.selectFiles);

    const guardarDocumento = async (fechaEmision: Date, operacion: string, codigoCliente: string) => {
        const file = filesStreamData?.length > 0 ? filesStreamData[0] : null;
        const pathName = process.env.NEXT_PUBLIC_PATH_NAME ?? ""
        const formData = new FormData();
        formData.append("file", file);
        formData.append("pathName", pathName);
        const resMsFileStream = await postSubirMsFileStream(formData);

        let newFetch = moment(fechaEmision).format('DDMMYYYY');

        const msFileStreamPath = resMsFileStream?.pathArchivo ?? ""

        const dataForPost: GuardarDocumentoRequest = {
            codigoTipoDocumento: Number(ID_TIPO_DOCUMENTO_PROMISSORY_NOTES),
            rutaDocumento: msFileStreamPath,
            fechaEmision: newFetch,
            descripcionDocumento: file?.name,
            codigoCliente: codigoCliente,
            // codigoLegajo: numeroDeLegajo[0].nextSequence,
            hadoop: msFileStreamPath,
            hadoopPath: msFileStreamPath,
            codigoUsuario: usuarios?.codigo ?? "",
            codigoProducto: ID_PRODUCTO_PROMISSORY_NOTES,
            codigoSubproducto: ID_SUB_PRODUCTO_PROMISSORY_NOTES,
            operacion: operacion
        }
        const res = await postGuardarDocumento(dataForPost)
        return res
    }

    return { guardarDocumento }
}