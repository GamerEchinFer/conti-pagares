export default interface DatosAgente {
    codigo:       string;
    nombre:       string;
    sucursal:     Sucursal;
    departamento: Departamento;
    correo:       string;
    nivel:        number;
}

export interface Departamento {
    codigo:      number;
    descripcion: string;
}

export interface Sucursal {
    codigo:      string;
    descripcion: string;
}