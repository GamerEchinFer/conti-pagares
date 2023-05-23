export const statusScoring = {
	Analizar: 'ANALIZAR',
	Rechazado: 'RECHAZAR',
	Aprobado: 'APROBAR',
	Sugerir: 'SUGERIR'
};

export const logsEvents = {
	Seguridad:            1,
	Transaccional:        2,
	Consulta:             3,
	Error:             	  4,
	Warning:              5
};

export const statusSolicitudes = {
    Aprobado:             3,
    EnProceso:            2,
    Rechazado:            4,
    Recibido:             1,
};

export const modulos = {
	Auth:				'Autenticación',
	Producto:			'Productos',
	Cuenta:				'Solicitud de Cuenta',
	Tarjeta:			'Solicitud de Tarjeta',
	Prestamo:			'Solicitud de Credito',
	Actualizacion:		'Actualización de datos',
	Ahorro:				'Solicitud de Ahorro Programado',
};

export enum FechaDebitoEnum {
    UnoAlDiez = "1",
    OnceAlVeinte = "2",
    FinDeMes = "3"
};