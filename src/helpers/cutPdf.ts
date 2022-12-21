import * as pdfjsLib from 'pdf-lib'

export const cutPdf = async (base64: string, cut_from: number, cut_to: number, totalPages: number) => {    
    const pdfDoc = await pdfjsLib.PDFDocument.load(base64)

    // Cortar 

    // TODO - Si el documento solo tiene una pagina

    // Si el documento tiene mas de una pagina    
    // Recorre al revez porque tiene que eliminarse desde el ultimo, realiza el corte de las paginas seleccionadas       
    // for (let i = cut_to; i >= cut_from; i--) {          
    //     pdfDoc.removePage(i - 1)
    // }

    for (let i = totalPages; i > 0; i--) {
        if( cut_from <= i && i <= cut_to) continue
        pdfDoc.removePage(i - 1)
        console.log(pdfDoc)
    }


    // Tenemos que volver a convertir de bytes a base64 y guardar en el base64Modfied
    // Guardar el documento
    const pdfBytes = await pdfDoc.save()
    return Buffer.from(pdfBytes).toString('base64');    
};

export const parsePdfBase64 = (base64: string) => `data:application/pdf;base64,${base64}`