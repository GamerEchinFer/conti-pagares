import { ColeccionDocumento, DocumentosUsuarioResponse } from '../interfaces/interfaces';
import { listarCodigoCliente } from '../api/ApiAuth';
import { datosCliente } from '../redux/slices/datosCliente.slice';
import { allowedNodeEnvironmentFlags } from 'process';

/**
 * Example:
 * {
 *  subgrupo1: [coleccionDocumento1, coleccionDocumento2],
 *  subgrupo2: [coleccionDocumento1, coleccionDocumento2]
 * }/
 * @param data 
 */

export type documentGrupoFilter = {[key: string]: ColeccionDocumento}

export const documentUserMapper = (data: DocumentosUsuarioResponse, idGrupo: number) => {
    
    
return


}