import axios from "axios";
const baseUrlPromissoryNotes = process.env.NEXT_PUBLIC_API_BASE_URL;
const apiPromissoryNotes = axios.create({ baseURL: baseUrlPromissoryNotes, headers: { "X-API-KEY": "f9@dg+6TR5SeCh-h9g!z*5" } });


const baseUrlDataClient = process.env.NEXT_PUBLIC_API_CLIENT_URL;
const apiKey = process.env.NEXT_PUBLIC_API_CLIENT_KEY ?? "";
const apiDataClient = axios.create({ baseURL: baseUrlDataClient, headers: { "ApiKey": apiKey } });

const baseUrlDigitalApi = process.env.NEXT_PUBLIC_API_DIGITAL_URL;
const apiDigital = axios.create({ baseURL: baseUrlDigitalApi, headers: { "ApiKey": apiKey } });

const baseUrlDigitalArchivosApi = process.env.NEXT_PUBLIC_API_DIGITALIZACION_FILE_URL;
const apiDigitalArchivos = axios.create({ baseURL: baseUrlDigitalArchivosApi });

const internalApi = axios.create({ baseURL: "/api" });


export {
    apiPromissoryNotes,
    apiDataClient,
    internalApi,
    apiDigitalArchivos,
    apiDigital
}