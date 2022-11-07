import { useEffect, useState } from "react";
import { getSolicitudClienteById } from "../api/gdiApi";
import { SolicitudCliente } from "../interfaces/interfaces";

export const useSolicitud = (id: number) => {
// Configuración a ser utilizada  para comunicar los objetos relacionados utilizando un id
    const [solicitud, setSolicitud] = useState<SolicitudCliente | null>(null);

    useEffect(() => {
        getSolicitudClienteById(id)
        .then((response) => {
          setSolicitud(response.data);
        });

      },[]);

    return solicitud
}