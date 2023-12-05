import ExportButton from '../../shared/ui/buttons/ExportButton';
import { exportDataTable } from '../../../helpers/exportFromJson';
import { PromissoryNotesConsult } from '../../../models/responses/promissoryNotes';
import { PromissoryNotesStatusHistory } from '../../../interfaces/promissoryNotes';
import { promissoryNotesHelper } from '../../../helpers/promissoryNotes';

interface FormActionsProps {
    promissoryNotesConsult: PromissoryNotesConsult | null;
}
const FormActions = ({ promissoryNotesConsult }: FormActionsProps) => {
    const statusHistory: PromissoryNotesStatusHistory[] = promissoryNotesConsult ?
        promissoryNotesHelper.generateStatusHistory(promissoryNotesConsult) : [];

    const handlerClickExport = () => {
        if (statusHistory.length > 0) {
            exportDataTable({ data: statusHistory, fileName: "example" });
        }
    };

    return (
        <>
            <ExportButton onClick={handlerClickExport}>Exportar</ExportButton>
        </>
    )
}

export default FormActions
