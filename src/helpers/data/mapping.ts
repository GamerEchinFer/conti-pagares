import { DeepKeys, DeepValue, promissoryNotesConsultExport } from "../../models/exports/promissoryNotes";
import { PromissoryNotesConsult } from "../../models/responses/promissoryNotes";

const mappingPromissoryNotes = (data: PromissoryNotesConsult[]) => {
    const mappedData = data.map((item: PromissoryNotesConsult) => {
        promissoryNotesConsultExport.forEach((header) => {
            const value: DeepValue<PromissoryNotesConsult, DeepKeys<PromissoryNotesConsult>> = header.key;
            console.log(value);
        });
    });
};