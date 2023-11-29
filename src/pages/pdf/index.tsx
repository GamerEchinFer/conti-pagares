
import Link from 'next/link';
import ModuleContentWrapper from '../../components/shared/ui/ModuleContentWrapper';
import { pdfExample } from '../../data/pdf';
import dynamic from 'next/dynamic';
import PDFComponent from '../../components/SubirDocumentos/PDFComponent';
const PdfVisualizerNoSsr = dynamic(() => import('../../components/shared/ui/PdfVisualizer'), {
    ssr: false,
});
function index() {
    
    const url = pdfExample;

    return (
        <ModuleContentWrapper title="Acuses Digitalizados" subtitle="Seleccioná el tipo de búsqueda y completa el campo para iniciar el proceso de búsqueda.">
                <PDFComponent base64={url} />
        </ModuleContentWrapper>
    );
}

export default index;
