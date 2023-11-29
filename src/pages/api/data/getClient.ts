import { NextApiRequest, NextApiResponse } from 'next';
import { clientsServices } from '../../../services/clientsService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { documentNumber, clientCode } = req.query as { documentNumber: string, clientCode: string };

        let clientData: ClientData | null = null;
        if(clientCode != ""){
            console.log("clientCode", clientCode);
            const respClient = await clientsServices.getClientDataByClientCode(clientCode);
            clientData = respClient.data;
            // clientFullName = `${respClient.data.primerNombre} ${respClient.data.segundoNombre} ${respClient.data.primerApellido} ${respClient.data.segundoApellido}`;
        }

        if(documentNumber != "" && clientData == null){
            const respClient = await clientsServices.getClientDataByDocumentNumber(documentNumber);
            clientData = respClient.data;
            // clientFullName = `${respClient.data.primerNombre} ${respClient.data.segundoNombre} ${respClient.data.primerApellido} ${respClient.data.segundoApellido}`;
        }
        if(clientData == null){
            res.status(404).json({ message: 'Client not found' });
            return;
        }
        res.status(200).json(clientData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error });
    }
}
