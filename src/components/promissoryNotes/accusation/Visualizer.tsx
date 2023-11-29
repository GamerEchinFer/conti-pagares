import Stack from '@mui/material/Stack'
import React from 'react'
import InfoLabel from '../../shared/form/InfoLabel'
import Box from '@mui/material/Box'
// import * as pdfjsLib from 'pdf-lib';
// import { Document } from 'react-pdf'
import dynamic from 'next/dynamic'
import { useQuery } from '@tanstack/react-query'
import { promissoryNotesServices } from '../../../services/promissoryNotesService'
import { internalServices } from '../../../services/internalService'


const PdfVisualizerNoSsr = dynamic(() => import('../../shared/ui/PdfVisualizer'), {
    ssr: false,
});

interface VisualizerProps {
    path: string;
    onUrlChange: (url: string) => void;
}
const Visualizer = ({ path, onUrlChange }: VisualizerProps) => {

    const { isLoading, isFetched, data: downloadData, refetch: fetchConsult, isRefetching } = useQuery({
        queryKey: ['getUrlFile', path],
        queryFn: async () => {
            const resp = await internalServices.downloadFolderDocument(path);
            // const blob = new Blob([resp.data], { type: 'application/pdf' });
            const url = resp.data;
            return {
                url: url,
            };
        },
        retry: false,
        enabled: path != "",
    });

    if (isFetched && downloadData?.url) {

        onUrlChange(downloadData?.url);
    }
    return (
        <Stack
            sx={{
                width: "700px",
            }}
        >
            <Box>
                {downloadData?.url && <PdfVisualizerNoSsr url={downloadData?.url} />}
            </Box>
        </Stack>
    )
}

export default Visualizer