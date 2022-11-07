import { useEffect, useState } from "react";
// import { getTipoBusqueda } from "../api/gdiApi";
import { TipoBusqueda } from "../interfaces/interfaces";

export const useTipoBusqueda = () => {
// Configuración a ser utilizada  para comunicar los objetos relacionados utilizando un id
    const [tipoBusqueda, setTipoBusqueda] = useState<TipoBusqueda[]>([]);

    useEffect(() => {
      // CONFIGURAR API
      /*  getTipoBusqueda()
        .then((response) => {
          // debugger;
          setTipoBusqueda(response.data);
        });
*/
      },[]);

    return tipoBusqueda
}