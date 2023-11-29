import Button from '@mui/material/Button'
import ExportButton from '../../shared/ui/buttons/ExportButton';
import { exportDataTable } from '../../../helpers/exportFromJson';
import { PromissoryNotesConsult } from '../../../models/responses/promissoryNotes';
import { EPromissoryNotesStatus, PromissoryNotesStatusHistory } from '../../../interfaces/promissoryNotes';

interface FormActionsProps {
    promissoryNotesConsult: PromissoryNotesConsult | null;
}
const FormActions = ({ promissoryNotesConsult }: FormActionsProps) => {
    const statusHistory: PromissoryNotesStatusHistory[] = [];

    const keys = Object.keys(promissoryNotesConsult ?? {});
    if (keys.length > 0) {
        keys.forEach(item => {
            if (item == EPromissoryNotesStatus.Request) {
                statusHistory.push({
                    branch: promissoryNotesConsult?.solicitud?.nombreSucursal ?? "",
                    status: EPromissoryNotesStatus.Request,
                    createdAt: promissoryNotesConsult?.solicitud?.fechaSolicitud ?? "",
                    area: promissoryNotesConsult?.solicitud?.areaSolicitud ?? "",
                    user: promissoryNotesConsult?.solicitud?.nombreUsuario ?? "",
                })
            }
            if (item == EPromissoryNotesStatus.Reception) {
                statusHistory.push({
                    branch: "",
                    status: EPromissoryNotesStatus.Reception,
                    createdAt: promissoryNotesConsult?.recepcion?.fechaRecepcion ?? "",
                    area: promissoryNotesConsult?.recepcion?.areaRecepcion ?? "",
                    user: promissoryNotesConsult?.recepcion?.nombreUsuario ?? "",
                })
            }
            if (item == EPromissoryNotesStatus.Delivery) {
                statusHistory.push({
                    branch: "",
                    status: EPromissoryNotesStatus.Delivery,
                    createdAt: promissoryNotesConsult?.envio?.fechaEnvio ?? "",
                    area: promissoryNotesConsult?.envio?.areaEnvio ?? "",
                    user: promissoryNotesConsult?.envio?.nombreUsuario ?? "",
                })
            }
        });
    }

    const handlerClickExport = () => {
        if (statusHistory.length > 0) {
            exportDataTable({ data: [promissoryNotesConsult], fileName: "example" });
        }
    };

    return (
        <>
            <ExportButton onClick={handlerClickExport}>Exportar</ExportButton>
        </>
    )
}

export default FormActions
