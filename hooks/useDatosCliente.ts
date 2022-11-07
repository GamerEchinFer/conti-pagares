import { useEffect, useState } from "react";
import { getDatosCliente } from "../api/gdiApi";
import { DatosCliente } from "../interfaces/interfaces";

export const useDatosCliente = () => {
// Configuración a ser utilizada  para comunicar los objetos relacionados utilizando un id
    const [datosCliente, setDatosCliente] = useState<DatosCliente | null>(null);

    useEffect(() => {
        getDatosCliente()
        .then((response) => {
          // debugger;
          setDatosCliente(response?.data[0] ?? null);
        });

      },[]);

    return datosCliente
}