import dayjs, { Dayjs } from "dayjs";
import { DATE_FORMAT_REQUEST } from "../constants/constants";

export const getDateRequestFormated = (date: Dayjs | Date) => {
    if (date instanceof dayjs) {
        const dayJs_ = date as Dayjs;
        return dayJs_.format(DATE_FORMAT_REQUEST);
    }
    if (date instanceof Date) {
        return dayjs(date).format(DATE_FORMAT_REQUEST)
    }
}

export const getDateRangeQueryRequestFormated = (from: string, to: string) => {
    const params = new URLSearchParams();
    params.append('FechaDesde', from ?? "");
    params.append('FechaHasta', to ?? "");
    const queryString = params.toString();

    return queryString
}


