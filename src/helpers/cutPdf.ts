import * as pdfjsLib from 'pdf-lib'

export const cutPdf = async (
    base64: string,
    cut_from: number,
    cut_to: number,
    totalPages: number,
    totalPagesModified: number,
    sizeModified: number
    ) => {    
    const pdfDoc = await pdfjsLib.PDFDocument.load(base64);

    for (let i = totalPages; i > 0; i--) {
        if( cut_from <= i && i <= cut_to) continue
        pdfDoc.removePage(i - 1)
        console.log(pdfDoc)
    }

    const pdfBytes = await pdfDoc.save()
    return Buffer.from(pdfBytes).toString('base64');    
};

export const parsePdfBase64 = (base64: string) => `data:application/pdf;base64,${base64}`