import Box from '@mui/material/Box'
import React, { memo } from 'react'
import ExportButton from '../../shared/ui/buttons/ExportButton'

interface FormActionsProps {
    url: string;
}
const FormActions = memo(({ url }: FormActionsProps) => {
    const canExport = url != "";

    const handlerClickExport = () => {
        if (!canExport) return;
        const filename = 'filename.pdf';

        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = filename;
        anchor.style.display = 'none';
        document.body.appendChild(anchor);

        anchor.click();

        document.body.removeChild(anchor);
    }


    return (
        <Box sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <ExportButton onClick={handlerClickExport} disabled={!canExport}>Exportar</ExportButton>
        </Box>
    )
});

export default FormActions

