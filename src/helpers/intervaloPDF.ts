import * as pdfjsLib from 'pdf-lib'

export const intervaloPDF = async (base64: string, intervalo: string, totalPages: number, totalPagesModified: number, sizeModified: number) => {
    const pdfDoc = await pdfjsLib.PDFDocument.load(base64)
    const pdfNew = await pdfjsLib.PDFDocument.create()
    let intervaloCorregido = intervalo.replace(/\s+/g,'')
    let inter = intervaloCorregido.replace(/[^0-9,-]/g, '')
    let numIngresados = []
    let numFinal = []
    numIngresados = inter.split(',')

    for (let i in numIngresados) {

        let numIndi = numIngresados[i]

        if (numIndi.includes('-')) {
            let numGuion = numIndi.split('-')
            let posicionInicial = parseInt(numGuion[0])
            while (parseInt(numGuion[1]) >= posicionInicial) {
                numFinal.push(posicionInicial.toString())
                posicionInicial = posicionInicial + 1
            }

        }
        else {
            numFinal.push(numIndi)
        }
    }
    let intervaloInt = []
    for (let i in numFinal) {
        intervaloInt.push(parseInt(numFinal[i]) - 1)
    }
    intervaloInt.sort((a, b) => a - b)

    const paginasCopiadas = await pdfNew.copyPages(pdfDoc, intervaloInt)

    for (let i in paginasCopiadas) {
        pdfNew.addPage(paginasCopiadas[i])
    }

    // Tenemos que volver a convertir de bytes a base64 y guardar en el base64Modfied
    // Guardar el documento

    const pdfBytes = await pdfNew.save()
    return Buffer.from(pdfBytes).toString('base64');
};

export const parsePdfBase64 = (base64: string) => `data:application/pdf;base64,${base64}`