import { useEffect, useState } from "react";
import { getAllSolicitudCliente } from "../api/gdiApi";
import { SolicitudCliente } from "../interfaces/interfaces";

export const useSolicitudes = () => {
// Configuración a ser utilizada  para comunicar los objetos relacionados utilizando un id
    // const [solicitud, setSolicitud] = useState<SolicitudCliente[]>([]);

    // useEffect(() => {
    //     getAllSolicitudCliente()
    //     .then((response) => {
    //       setSolicitud(response.data);
    //     });

    //   },[]);

    // return solicitud
}