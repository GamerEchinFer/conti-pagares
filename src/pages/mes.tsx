import { Divider, Grid, ListItem, ListItemText } from "@mui/material";
import dayjs from 'dayjs';
import { useEffect, useState, ChangeEvent, useRef } from 'react';

const meses: {[key: number]: JSX.Element} = {
    0:  <span>Enero</span>,
    1:  <span>Febrero</span>,
    2:  <span>Marzo</span>,
    3:  <span>Abril</span>,
    4:  <span>Mayo</span>,
    5:  <span>Junio</span>,
    6:  <span>Julio</span>, 
    7:  <span>Agosto</span>,
    8:  <span>Septiembre</span>,
    9:  <span>Octubre</span>,
    10: <span>Noviembre</span>,
    11: <span>Diciembre</span>,
}


export default function mesPage() {

    const [mesPeriodos, setmesPeriodos] = useState<number[]>([])
    const [periodo, setPeriodo] = useState("6")
    const inputRef = useRef<any>()

    useEffect(() => {
        generateMesPeriodos(6)
    }, [])

    function generateMesPeriodos(valuePeriodo: number) {
        const items: number[] = []
        const monthActual = dayjs().month()
        for (let i = monthActual; i > monthActual - valuePeriodo; i--) {
            const nuevoMonth = dayjs().month(i).month()
            items.push(nuevoMonth)
        }

        setmesPeriodos([...items])
    }

    const handlePeriodoInput = ({target}: ChangeEvent<HTMLInputElement>) => {
        if (Number(target.value) >= 6  || !Number(target.value)) {
          setPeriodo(target.value) // Se actualiza despues recien de la funcion
          // Hasta donde se puede retroceder

        }

        if (Number(target.value) >= 6) {
            generateMesPeriodos(Number(target.value))
        }
      }

    return (
        <Grid item xs={12} md={6}>
          <input type={"number"} onFocus={() => inputRef.current.select()} ref={inputRef} value={periodo} onChange={handlePeriodoInput} ></input>
          <ListItemText primary={
             mesPeriodos.map((idx) => {
              return (
              <>
                <ListItem key={idx}>
                  <ListItem>
                    {idx}
                  </ListItem>
                  <ListItem>{meses[idx]}</ListItem>
                  
                </ListItem>
                <Divider />
              </>
              )
            })
          } />
      </Grid>
    )
}