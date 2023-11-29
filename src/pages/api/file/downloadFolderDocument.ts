import { NextApiRequest, NextApiResponse } from 'next';
import { promissoryNotesServices } from '../../../services/promissoryNotesService';
import { apiDigitalArchivos } from '../../../lib/apiClient';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { path } = req.query as { path: string };
        // https://api-sandbox-gw.bancontinental.com.py/autenticarServicio/v1/realms/interno
        // Grant - Type: client_credentials
        // Scope: profile
        // Subscription - Key: 578a3e189d3a4da791ad1aa2a00bae3c
        // Client - Id: gestion - documental
        // Client - Secret: 9f81d3e7 - 884f - 48c4 - 9b91 - ee34b0d16d1a
        const urlAuth = "https://api-sandbox-gw.bancontinental.com.py/autenticarServicio/v1/realms/interno";
        const body = {
            "Grant_Type": "client_credentials",
            "Scope": "profile",
            "Subscription-Key": "",
            "Client_Id": "gestion-documental",
            "Client_Secret": "9f81d3e7-884f-48c4-9b91-ee34b0d16d1a"
        };
        const accessToken = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJkcXg3bWhXTEwyQW9OOHBfWGd6cG5iajRhMzFySDV1Um5Ua0Fld2k2ZjFnIn0.eyJleHAiOjE2NjY5NjQ2ODQsImlhdCI6MTY2Njk2NDM4NCwianRpIjoiN2VkNGYwMDktMDAwNy00ZGEyLWIzMDQtZGU3MGY4NmIxMjdkIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay1kZXNhLmJhbmNvbnRpbmVudGFsLmNvbS5weS9hdXRoL3JlYWxtcy9pbnRlcm5vIiwiYXVkIjpbIm1ldGlyaSIsImFjY291bnQiXSwic3ViIjoiMTg5MGYzMGYtMDFlNS00ZTMzLWI5MzAtMDlkZGRlMzNiZjIzIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZ2VzdGlvbi1kb2N1bWVudGFsIiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLWludGVybm8iLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiY2xpZW50SG9zdCI6IjEwLjQ0LjAuMCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY2xpZW50SWQiOiJnZXN0aW9uLWRvY3VtZW50YWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJzZXJ2aWNlLWFjY291bnQtZ2VzdGlvbi1kb2N1bWVudGFsIiwiY2xpZW50QWRkcmVzcyI6IjEwLjQ0LjAuMCJ9.WlTRTCwIaDzAHi4s4W7LCeQrM4U3sb8xT7B2q0LAWGMkjsVUOyfVcyBXWG33kNuvEXo7Sz8CwFYSXQEMhInnQ43ZCbvcK8wQhWiJAUaltKGSgVlRsflFKp0t8-w6ZTrbVAfDmYZldW3C0lnr7DygNQWsL7YXjR75_NqYuJG0WxkG_86mMRcbR2aY0xjYGFbfCUp2VnFVssdu3Y5Pz16TB96rFYrxRyQoPMwgDPX_-Ywz0cBAhwAhW9rBTKLLTG9p2cyQa_42cpZZimpMV-U0FRG9lRyObDMIcrmytpRYOG-8LlHP5dRY5pdw-k7PvUTCIXeqO7f2LbABIWGSlpOmRw";

        const headers = {
            "Authentication": `Bearer ${accessToken}`,
            ...body
        };
        const respAuth = await axios.post(urlAuth, null, { headers: headers });
        console.log("respAuth", respAuth.data);
        const accessTokenAuth = respAuth.data.access_token;
        console.log("accessTokenAuth", accessTokenAuth);
        const respClient = await promissoryNotesServices.downloadFile(path, accessTokenAuth);
        const binaryData = Buffer.from(respClient.data.datosArchivo, 'base64');
        const byteNumbers = new Array(binaryData.length);
        for (let i = 0; i < binaryData.length; i++) {
            byteNumbers[i] = binaryData[i];
        }
        const byteArray = new Uint8Array(byteNumbers);
        const arrayBuffer = byteArray.buffer;

        // Crear un objeto Blob a partir del array buffer
        const blob = new Blob([arrayBuffer], { type: 'application/pdf' }); // Cambia el tipo MIME si es necesario
        res.setHeader('Content-Type', 'application/pdf'); // Asegúrate de usar el tipo MIME correcto
        res.send(blob);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error });
    }
}
