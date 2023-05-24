import { useEffect, useState } from "react";
import { getSolicitudCliente } from "../api/apmDesaApi";
import { SolicitudCliente } from "../interfaces/interfaces";

export const useSolicitud = (id: number) => {
// Configuración a ser utilizada  para comunicar los objetos relacionados utilizando un id
    const [solicitud, setSolicitud] = useState<SolicitudCliente | null>(null);

    useEffect(() => {
        getSolicitudCliente()
        .then((response) => {
          setSolicitud(response.request);
        });

      },[]);

    return solicitud
}