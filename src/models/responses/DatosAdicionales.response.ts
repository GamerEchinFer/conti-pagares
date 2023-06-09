export default interface DatosAdicionales {
    tieneToken:             boolean;
    tienePush:              boolean;
    passwordPrimeraVez:     boolean;
    existeClienteApp:       boolean;
    actualizaDatos:         boolean;
    esAccionista:           boolean;
    contratoUnico:          ContratoUnico;
}

export interface ContratoUnico {
    tieneContratoUnico: boolean;
    version:            string;
    carpetaDigital:     boolean;
}