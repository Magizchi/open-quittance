import BlobStream from "blob-stream";
import type { IBlobStream } from "blob-stream";
import PdfPrinter from "pdfmake";
import type { TDocumentDefinitions } from "pdfmake/interfaces";

const GeneratePdf = (docDefinition: TDocumentDefinitions): Promise<Blob> => {
  const fonts = {
    // Default fonts, don't delete this
    Roboto: {
      normal: "src/lib/assets/fonts/Roboto/Roboto-Regular.ttf",
      bold: "src/lib/assets/fonts/Roboto/Roboto-Medium.ttf",
    },
    // Custom fonts
    // Hind: {
    //   // Only Roboto work? I used "Hind"
    //   normal: "src/lib/assets/fonts/hind/Hind-Regular.otf",
    //   bold: "src/lib/assets/fonts/hind/Hind-Bold.ttf",
    // },
  };

  const printer = new PdfPrinter(fonts);

  return new Promise((resolve) => {
    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(BlobStream()).on("finish", function (this: IBlobStream) {
      resolve(this.toBlob("application/pdf"));
    });
    pdfDoc.end();
  });
};

export default GeneratePdf;
