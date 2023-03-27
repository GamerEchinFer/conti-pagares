import { ColeccionDocumento } from '../../interfaces/interfaces';

export const querySearch = (query: string) => (index: ColeccionDocumento) => {
    return index.datosAdicionales.descripcion.trim().toLowerCase().includes(query.trim().toLowerCase())
}

export const filterByGroup = (idGroup: number) => (item: ColeccionDocumento) => {
    return item.filtroDocumento.findIndex(filtro => filtro.idGrupo === idGroup) > -1
}