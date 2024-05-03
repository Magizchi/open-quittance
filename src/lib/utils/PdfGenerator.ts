/* eslint-disable @typescript-eslint/no-explicit-any */
import BlobStream from "blob-stream";
import type { IBlobStream } from "blob-stream";
import PdfPrinter from 'pdfmake';
import type { BufferOptions, TDocumentDefinitions } from "pdfmake/interfaces";

const GeneratePdf = (docDefinition: TDocumentDefinitions, options?: BufferOptions): Promise<Blob> => {

    const fonts = {
        Roboto: {
            normal: 'src/lib/fonts/Roboto/Roboto-Regular.ttf',
            italics: 'src/lib/fonts/Roboto/Roboto-Italic.ttf',
            bold: 'src/lib/fonts/Roboto/Roboto-Bold.ttf'
        }
    };

    const printer = new PdfPrinter(fonts);

    return new Promise((resolve) => {
        const pdfDoc = printer.createPdfKitDocument(docDefinition, options);
        pdfDoc.pipe(BlobStream()).on('finish', function (this: IBlobStream) {
            resolve(this.toBlob('application/pdf'));
        });
        pdfDoc.end();
    });
};

export default GeneratePdf;