import { PromissoryNotesConsultDelivery } from '../interfaces/promissoryNotes';
import { PromissoryNotesConsult } from '../models/responses/promissoryNotes';
const exampleDataDeliveryJson = `
[
    {
        "numeroEnvio": "001600",
        "operacion": "06060132814",
        "cuota": "013",
        "fechaVencimiento": "2015-10-12T00:00:00",
        "estado": "RECEPCIONADO",
        "observacion": "vence 30/09/15",
        "nombreClienteRecibe": null,
        "monto": 1000000,
        "cliente": {
            "tipoDocumento": "CRD",
            "codigoCliente": "573089",
            "nombreCliente": "NOMBRE-573089"
        },
        "solicitud": {
            "nombreSucursal": null,
            "areaSolicitud": null,
            "nombreUsuario": null,
            "fechaSolicitud": null
        },
        "recepcion": {
            "fechaRecepcion": "2015-11-27T00:00:00",
            "nombreUsuario": "PPC",
            "areaRecepcion": "JEFE OPERATIVO"
        },
        "envio": {
            "nombreSucursal": "CASA MATRIZ",
            "areaEnvio": "CUSTODIA DE DOCUMENTOS",
            "nombreUsuario": "MIS",
            "fechaEnvio": "2015-10-09T00:00:00"
        },
        "devolucion": {
            "fechaDevolucion": null,
            "nombreUsuario": null
        },
        "recepcionCustodia": {
            "fechaRecepcionCustodia": null,
            "nombreUsuario": null
        },
        "entrega": {
            "fechaEntrega": null,
            "nombreClienteEntrega": null,
            "nombreUsuario": null
        },
        "rechazo": {
            "fechaRechazo": null,
            "nombreUsuario": null
        }
    },
    {
        "numeroEnvio": "001600",
        "operacion": "06060132814",
        "cuota": "014",
        "fechaVencimiento": "2015-10-12T00:00:00",
        "estado": "RECEPCIONADO",
        "observacion": "vence 30/09/15",
        "nombreClienteRecibe": null,
        "monto": 6765619,
        "cliente": {
            "tipoDocumento": "CRD",
            "codigoCliente": "573x089",
            "nombreCliente": "NOMBRE-573089"
        },
        "solicitud": {
            "nombreSucursal": null,
            "areaSolicitud": null,
            "nombreUsuario": null,
            "fechaSolicitud": null
        },
        "recepcion": {
            "fechaRecepcion": "2015-11-27T00:00:00",
            "nombreUsuario": "PPC",
            "areaRecepcion": "JEFE OPERATIVO"
        },
        "envio": {
            "nombreSucursal": "CASA MATRIZ",
            "areaEnvio": "CUSTODIA DE DOCUMENTOS",
            "nombreUsuario": "MIS",
            "fechaEnvio": "2015-10-09T00:00:00"
        },
        "devolucion": {
            "fechaDevolucion": null,
            "nombreUsuario": null
        },
        "recepcionCustodia": {
            "fechaRecepcionCustodia": null,
            "nombreUsuario": null
        },
        "entrega": {
            "fechaEntrega": null,
            "nombreClienteEntrega": null,
            "nombreUsuario": null
        },
        "rechazo": {
            "fechaRechazo": null,
            "nombreUsuario": null
        }
    },
    {
        "numeroEnvio": "001600",
        "operacion": "06060133914",
        "cuota": "003",
        "fechaVencimiento": "2015-10-12T00:00:00",
        "estado": "RECEPCIONADO",
        "observacion": "vence 30/09/15",
        "nombreClienteRecibe": null,
        "monto": 10273995,
        "cliente": {
            "tipoDocumento": "CRD",
            "codigoCliente": "5735089",
            "nombreCliente": "NOMBRE-573089"
        },
        "solicitud": {
            "nombreSucursal": null,
            "areaSolicitud": null,
            "nombreUsuario": null,
            "fechaSolicitud": null
        },
        "recepcion": {
            "fechaRecepcion": "2015-11-27T00:00:00",
            "nombreUsuario": "PPC",
            "areaRecepcion": "JEFE OPERATIVO"
        },
        "envio": {
            "nombreSucursal": "CASA MATRIZ",
            "areaEnvio": "CUSTODIA DE DOCUMENTOS",
            "nombreUsuario": "MIS",
            "fechaEnvio": "2015-10-09T00:00:00"
        },
        "devolucion": {
            "fechaDevolucion": null,
            "nombreUsuario": null
        },
        "recepcionCustodia": {
            "fechaRecepcionCustodia": null,
            "nombreUsuario": null
        },
        "entrega": {
            "fechaEntrega": null,
            "nombreClienteEntrega": null,
            "nombreUsuario": null
        },
        "rechazo": {
            "fechaRechazo": null,
            "nombreUsuario": null
        }
    },
    {
        "numeroEnvio": "001600",
        "operacion": "06060134815",
        "cuota": "024",
        "fechaVencimiento": "2015-10-12T00:00:00",
        "estado": "ENTREGADO",
        "observacion": "vence 26/09/15",
        "nombreClienteRecibe": null,
        "monto": 4062500,
        "cliente": {
            "tipoDocumento": "CRD",
            "codigoCliente": "573089",
            "nombreCliente": "NOMBRE-573089"
        },
        "solicitud": {
            "nombreSucursal": null,
            "areaSolicitud": null,
            "nombreUsuario": null,
            "fechaSolicitud": null
        },
        "recepcion": {
            "fechaRecepcion": "2015-10-27T00:00:00",
            "nombreUsuario": "PPC",
            "areaRecepcion": "JEFE OPERATIVO"
        },
        "envio": {
            "nombreSucursal": "CASA MATRIZ",
            "areaEnvio": "CUSTODIA DE DOCUMENTOS",
            "nombreUsuario": "MIS",
            "fechaEnvio": "2015-10-09T00:00:00"
        },
        "devolucion": {
            "fechaDevolucion": null,
            "nombreUsuario": null
        },
        "recepcionCustodia": {
            "fechaRecepcionCustodia": null,
            "nombreUsuario": null
        },
        "entrega": {
            "fechaEntrega": "2021-08-05T00:00:00",
            "nombreClienteEntrega": "573089-CENTURY SYSTEMS SRL    (REG. INV. PAGARE CUOTA Nº 41 ENTREGADO AÑO 2017) ",
            "nombreUsuario": "RFB"
        },
        "rechazo": {
            "fechaRechazo": null,
            "nombreUsuario": null
        }
    },
    {
        "numeroEnvio": "001600",
        "operacion": "06060135515",
        "cuota": "012",
        "fechaVencimiento": "2015-10-12T00:00:00",
        "estado": "ENTREGADO",
        "observacion": "vence 24/09/15",
        "nombreClienteRecibe": null,
        "monto": 2100003,
        "cliente": {
            "tipoDocumento": "CRD",
            "codigoCliente": "573089",
            "nombreCliente": "NOMBRE-573089"
        },
        "solicitud": {
            "nombreSucursal": null,
            "areaSolicitud": null,
            "nombreUsuario": null,
            "fechaSolicitud": null
        },
        "recepcion": {
            "fechaRecepcion": "2015-11-27T00:00:00",
            "nombreUsuario": "PPC",
            "areaRecepcion": "JEFE OPERATIVO"
        },
        "envio": {
            "nombreSucursal": "CASA MATRIZ",
            "areaEnvio": "CUSTODIA DE DOCUMENTOS",
            "nombreUsuario": "MIS",
            "fechaEnvio": "2015-10-09T00:00:00"
        },
        "devolucion": {
            "fechaDevolucion": null,
            "nombreUsuario": null
        },
        "recepcionCustodia": {
            "fechaRecepcionCustodia": null,
            "nombreUsuario": null
        },
        "entrega": {
            "fechaEntrega": "2021-08-04T00:00:00",
            "nombreClienteEntrega": "573089-CENTURY SYSTEMS SRL    (REG. INV.PAGARECUOTA Nº 32 ENTREGADO AÑO 2017) ",
            "nombreUsuario": "RFB"
        },
        "rechazo": {
            "fechaRechazo": null,
            "nombreUsuario": null
        }
    },
    {
        "numeroEnvio": "001600",
        "operacion": "06060138015",
        "cuota": "004",
        "fechaVencimiento": "2015-10-12T00:00:00",
        "estado": "ENTREGADO",
        "observacion": "vence 29/09/15",
        "nombreClienteRecibe": null,
        "monto": 8877000,
        "cliente": {
            "tipoDocumento": "CRD",
            "codigoCliente": "573v089",
            "nombreCliente": "NOMBRE-573089"
        },
        "solicitud": {
            "nombreSucursal": null,
            "areaSolicitud": null,
            "nombreUsuario": null,
            "fechaSolicitud": null
        },
        "recepcion": {
            "fechaRecepcion": "2015-11-27T00:00:00",
            "nombreUsuario": "PPC",
            "areaRecepcion": "JEFE OPERATIVO"
        },
        "envio": {
            "nombreSucursal": "CASA MATRIZ",
            "areaEnvio": "CUSTODIA DE DOCUMENTOS",
            "nombreUsuario": "MIS",
            "fechaEnvio": "2015-10-09T00:00:00"
        },
        "devolucion": {
            "fechaDevolucion": null,
            "nombreUsuario": null
        },
        "recepcionCustodia": {
            "fechaRecepcionCustodia": null,
            "nombreUsuario": null
        },
        "entrega": {
            "fechaEntrega": "2021-08-05T00:00:00",
            "nombreClienteEntrega": "573089-CENTURY SYSTEMS SRL    (REG. INV. PAGARE CUOTA Nº 12 ENTREGADO AÑO 2017) ",
            "nombreUsuario": "RFB"
        },
        "rechazo": {
            "fechaRechazo": null,
            "nombreUsuario": null
        }
    },
    {
        "numeroEnvio": "001600",
        "operacion": "06060138115",
        "cuota": "007",
        "fechaVencimiento": "2015-10-12T00:00:00",
        "estado": "ENTREGADO",
        "observacion": "vence 30/09/15",
        "nombreClienteRecibe": null,
        "monto": 2221333,
        "cliente": {
            "tipoDocumento": "CRD",
            "codigoCliente": "57z3089",
            "nombreCliente": "NOMBRE-573089"
        },
        "solicitud": {
            "nombreSucursal": null,
            "areaSolicitud": null,
            "nombreUsuario": null,
            "fechaSolicitud": null
        },
        "recepcion": {
            "fechaRecepcion": "2015-11-27T00:00:00",
            "nombreUsuario": "PPC",
            "areaRecepcion": "JEFE OPERATIVO"
        },
        "envio": {
            "nombreSucursal": "CASA MATRIZ",
            "areaEnvio": "CUSTODIA DE DOCUMENTOS",
            "nombreUsuario": "MIS",
            "fechaEnvio": "2015-10-09T00:00:00"
        },
        "devolucion": {
            "fechaDevolucion": null,
            "nombreUsuario": null
        },
        "recepcionCustodia": {
            "fechaRecepcionCustodia": null,
            "nombreUsuario": null
        },
        "entrega": {
            "fechaEntrega": "2021-08-05T00:00:00",
            "nombreClienteEntrega": "573089-CENTURY SYSTEMS SRL    (REG. INV. PAGARE CUOTA Nº 25 ENTREGADO AÑO 2017)",
            "nombreUsuario": "RFB"
        },
        "rechazo": {
            "fechaRechazo": null,
            "nombreUsuario": null
        }
    },
    {
        "numeroEnvio": "001600",
        "operacion": "06060140315",
        "cuota": "002",
        "fechaVencimiento": "2015-10-12T00:00:00",
        "estado": "ENTREGADO",
        "observacion": "vence 30/09/15",
        "nombreClienteRecibe": null,
        "monto": 2925462,
        "cliente": {
            "tipoDocumento": "CRD",
            "codigoCliente": "5730089",
            "nombreCliente": "NOMBRE-573089"
        },
        "solicitud": {
            "nombreSucursal": null,
            "areaSolicitud": null,
            "nombreUsuario": null,
            "fechaSolicitud": null
        },
        "recepcion": {
            "fechaRecepcion": "2015-11-27T00:00:00",
            "nombreUsuario": "PPC",
            "areaRecepcion": "JEFE OPERATIVO"
        },
        "envio": {
            "nombreSucursal": "CASA MATRIZ",
            "areaEnvio": "CUSTODIA DE DOCUMENTOS",
            "nombreUsuario": "MIS",
            "fechaEnvio": "2015-10-09T00:00:00"
        },
        "devolucion": {
            "fechaDevolucion": null,
            "nombreUsuario": null
        },
        "recepcionCustodia": {
            "fechaRecepcionCustodia": null,
            "nombreUsuario": null
        },
        "entrega": {
            "fechaEntrega": "2021-08-04T00:00:00",
            "nombreClienteEntrega": "573089-CENTURY SYSTEMS SRL   (REG. INV. PAGARE CUOTA Nº 29 ENTREGADO EN EL AÑO 2017 A ENRIQUE BOGADO CI 2.211.450)",
            "nombreUsuario": "RFB"
        },
        "rechazo": {
            "fechaRechazo": null,
            "nombreUsuario": null
        }
    },
    {
        "numeroEnvio": "001600",
        "operacion": "06060141215",
        "cuota": "001",
        "fechaVencimiento": "2015-10-12T00:00:00",
        "estado": "ENTREGADO",
        "observacion": "vence 25/09/15",
        "nombreClienteRecibe": null,
        "monto": 1500000,
        "cliente": {
            "tipoDocumento": "CRD",
            "codigoCliente": "5973089",
            "nombreCliente": "NOMBRE-573089"
        },
        "solicitud": {
            "nombreSucursal": null,
            "areaSolicitud": null,
            "nombreUsuario": null,
            "fechaSolicitud": null
        },
        "recepcion": {
            "fechaRecepcion": "2015-11-27T00:00:00",
            "nombreUsuario": "PPC",
            "areaRecepcion": "JEFE OPERATIVO"
        },
        "envio": {
            "nombreSucursal": "CASA MATRIZ",
            "areaEnvio": "CUSTODIA DE DOCUMENTOS",
            "nombreUsuario": "MIS",
            "fechaEnvio": "2015-10-09T00:00:00"
        },
        "devolucion": {
            "fechaDevolucion": null,
            "nombreUsuario": null
        },
        "recepcionCustodia": {
            "fechaRecepcionCustodia": null,
            "nombreUsuario": null
        },
        "entrega": {
            "fechaEntrega": "2021-08-04T00:00:00",
            "nombreClienteEntrega": "573089-CENTURY SYSTEMS SRL    (REG. INV.PAGARE CUOTA Nº 36 ENTREGADO AÑO 2017) ",
            "nombreUsuario": "RFB"
        },
        "rechazo": {
            "fechaRechazo": null,
            "nombreUsuario": null
        }
    },
    {
        "numeroEnvio": "001601",
        "operacion": "06110521014",
        "cuota": "010",
        "fechaVencimiento": "2015-10-12T00:00:00",
        "estado": "RECEPCIONADO",
        "observacion": "vence 27/08/15",
        "nombreClienteRecibe": null,
        "monto": 1254,
        "cliente": {
            "tipoDocumento": "CRD",
            "codigoCliente": "5773089",
            "nombreCliente": "NOMBRE-573089"
        },
        "solicitud": {
            "nombreSucursal": null,
            "areaSolicitud": null,
            "nombreUsuario": null,
            "fechaSolicitud": null
        },
        "recepcion": {
            "fechaRecepcion": "2015-11-27T00:00:00",
            "nombreUsuario": "PPC",
            "areaRecepcion": "JEFE OPERATIVO"
        },
        "envio": {
            "nombreSucursal": "CASA MATRIZ",
            "areaEnvio": "CUSTODIA DE DOCUMENTOS",
            "nombreUsuario": "MIS",
            "fechaEnvio": "2015-10-09T00:00:00"
        },
        "devolucion": {
            "fechaDevolucion": null,
            "nombreUsuario": null
        },
        "recepcionCustodia": {
            "fechaRecepcionCustodia": null,
            "nombreUsuario": null
        },
        "entrega": {
            "fechaEntrega": null,
            "nombreClienteEntrega": null,
            "nombreUsuario": null
        },
        "rechazo": {
            "fechaRechazo": null,
            "nombreUsuario": null
        }
    },
    {
        "numeroEnvio": "001601",
        "operacion": "06110521014",
        "cuota": "011",
        "fechaVencimiento": "2015-10-12T00:00:00",
        "estado": "RECEPCIONADO",
        "observacion": "vence 27/09/15",
        "nombreClienteRecibe": null,
        "monto": 1254,
        "cliente": {
            "tipoDocumento": "CRD",
            "codigoCliente": "5763089",
            "nombreCliente": "NOMBRE-573089"
        },
        "solicitud": {
            "nombreSucursal": null,
            "areaSolicitud": null,
            "nombreUsuario": null,
            "fechaSolicitud": null
        },
        "recepcion": {
            "fechaRecepcion": "2015-11-27T00:00:00",
            "nombreUsuario": "PPC",
            "areaRecepcion": "JEFE OPERATIVO"
        },
        "envio": {
            "nombreSucursal": "CASA MATRIZ",
            "areaEnvio": "CUSTODIA DE DOCUMENTOS",
            "nombreUsuario": "MIS",
            "fechaEnvio": "2015-10-09T00:00:00"
        },
        "devolucion": {
            "fechaDevolucion": null,
            "nombreUsuario": null
        },
        "recepcionCustodia": {
            "fechaRecepcionCustodia": null,
            "nombreUsuario": null
        },
        "entrega": {
            "fechaEntrega": null,
            "nombreClienteEntrega": null,
            "nombreUsuario": null
        },
        "rechazo": {
            "fechaRechazo": null,
            "nombreUsuario": null
        }
    },
    {
        "numeroEnvio": "001601",
        "operacion": "06110527515",
        "cuota": "001",
        "fechaVencimiento": "2015-10-12T00:00:00",
        "estado": "ENTREGADO",
        "observacion": "vence 29/09/15",
        "nombreClienteRecibe": null,
        "monto": 6741,
        "cliente": {
            "tipoDocumento": "CRD",
            "codigoCliente": "5753089",
            "nombreCliente": "NOMBRE-573089"
        },
        "solicitud": {
            "nombreSucursal": null,
            "areaSolicitud": null,
            "nombreUsuario": null,
            "fechaSolicitud": null
        },
        "recepcion": {
            "fechaRecepcion": "2015-11-27T00:00:00",
            "nombreUsuario": "PPC",
            "areaRecepcion": "JEFE OPERATIVO"
        },
        "envio": {
            "nombreSucursal": "CASA MATRIZ",
            "areaEnvio": "CUSTODIA DE DOCUMENTOS",
            "nombreUsuario": "MIS",
            "fechaEnvio": "2015-10-09T00:00:00"
        },
        "devolucion": {
            "fechaDevolucion": null,
            "nombreUsuario": null
        },
        "recepcionCustodia": {
            "fechaRecepcionCustodia": "2016-02-10T00:00:00",
            "nombreUsuario": "MIS"
        },
        "entrega": {
            "fechaEntrega": "2021-08-04T00:00:00",
            "nombreClienteEntrega": "573089-CENTURY SYSTEMS SRL    (REG. INV. PAAGARE CUOTA Nº 11  ENTREGADO EN EL AÑO 2017 )",
            "nombreUsuario": "RFB"
        },
        "rechazo": {
            "fechaRechazo": null,
            "nombreUsuario": null
        }
    }
]
`;

export const exampleDataDelivery = JSON.parse(exampleDataDeliveryJson) as PromissoryNotesConsult[];