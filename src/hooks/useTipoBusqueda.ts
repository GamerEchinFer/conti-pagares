import { useEffect, useState } from "react";
import { getTipoBusqueda } from "../api/apmDesaApi";
import { TipoBusqueda } from "../interfaces/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const useTipoBusqueda = () => {
  const auth = useSelector((state: RootState) => state.authGDI.gdiAuth);

    const [tipoBusqueda, setTipoBusqueda] = useState<TipoBusqueda[]>([]);

    useEffect(() => {
        if (auth && auth.access_token) {
          console.log("prueba auth", auth);
          getTipoBusqueda()
          .then((response) => {
            setTipoBusqueda(response.data);
          });
        }        
      },[auth]);

    return tipoBusqueda
}
