import { NextApiRequest, NextApiResponse } from 'next';
import { promissoryNotesServices } from '../../../services/promissoryNotesService';
import { DateRangeRequestValue } from '../../../interfaces/_common';
import dayjs from 'dayjs';
import { DATE_FORMAT_REQUEST } from '../../../constants/constants';
import { PromissoryNotesFolderDocument } from '../../../models/responses/promissoryNotes';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { clientCode, fromDate, toDate } = req.query as { clientCode: string, fromDate: string, toDate: string };

        let folderDocumentData: PromissoryNotesFolderDocument[] = [];
        if (clientCode != "") {
            const dateRange: DateRangeRequestValue = {
                from: dayjs(fromDate, DATE_FORMAT_REQUEST),
                to: dayjs(toDate, DATE_FORMAT_REQUEST),
            };
            const respClient = await promissoryNotesServices.getFolderDocuments(clientCode, dateRange);
            folderDocumentData = respClient.data;
        }
        res.status(200).json(folderDocumentData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error });
    }
}
