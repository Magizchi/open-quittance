import PdfPrinter from "pdfmake";
import type { TDocumentDefinitions } from "pdfmake/interfaces";
import { dev } from "$app/environment";

const GeneratePdf = (docDefinition: TDocumentDefinitions): PdfPrinter.TCreatedPdf => {
  const prefix: string = dev ? "static" : "build/client";

  const fonts = {
    Roboto: {
      normal: `${prefix}/fonts/Roboto/Roboto-Regular.ttf`,
      bold: `${prefix}/fonts/Roboto/Roboto-Bold.ttf`,
    },
    Hind: {
      normal: `${prefix}/fonts/hind/Hind-Regular.otf`,
      bold: `${prefix}/fonts/hind/Hind-Bold.ttf`,
      italics: 'Times-Italic',
      bolditalics: 'Times-BoldItalic'
    },
  };

  PdfPrinter.addFonts(fonts);
  return PdfPrinter.createPdf(docDefinition);
};

export default GeneratePdf;
