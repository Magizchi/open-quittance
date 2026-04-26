import PdfPrinter from "pdfmake";
import type { TDocumentDefinitions } from "pdfmake/interfaces";
import { dev } from "$app/environment";

const GeneratePdf = (docDefinition: TDocumentDefinitions): Promise<Buffer<ArrayBufferLike>> => {
  const prefix: string = dev ? "static" : "build/client";

  const fonts = {
    Hind: {
      normal: `${prefix}/fonts/hind/Hind-Regular.otf`,
      bold: `${prefix}/fonts/hind/Hind-Bold.ttf`,
      italics: 'Times-Italic',
      bolditalics: 'Times-BoldItalic'
    },
  };

  PdfPrinter.addFonts(fonts);
  return PdfPrinter.createPdf(docDefinition).getBuffer();

};

export default GeneratePdf;
