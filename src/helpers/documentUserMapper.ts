import { ColeccionDocumento, DocumentosUsuarioResponse } from "../interfaces/interfaces";

export type DocumentoUsuarioResult = {[key: string]: ColeccionDocumento[]}

export const documentUserMapper = (data: DocumentosUsuarioResponse, idGrupo: number) => {
    const result: DocumentoUsuarioResult = data.coleccionDocumento
        .filter(item => Array.isArray(item.filtroDocumento) && item.filtroDocumento.length)
        .reduce((accum, actual) => {

            let obj: DocumentoUsuarioResult = {...accum}

            actual.filtroDocumento.forEach(item => {                
                if (idGrupo !== item.idGrupo) return;
                
                item.filtroSubgrupo.forEach((subitem) => {
                    if (!accum[subitem.subgrupoDescripcion]) {
                        obj = {...obj, [subitem.subgrupoDescripcion]: []}
                    }

                    obj = {...obj,  [subitem.subgrupoDescripcion]: [...obj[subitem.subgrupoDescripcion], {...actual}]}
                })
            })

            return obj
        }, {} as DocumentoUsuarioResult)

        return result
}