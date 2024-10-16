import BlobStream from 'blob-stream';
import type { IBlobStream } from 'blob-stream';
import PdfPrinter from 'pdfmake';
import type { BufferOptions, TDocumentDefinitions } from 'pdfmake/interfaces';

const GeneratePdf = (
	docDefinition: TDocumentDefinitions,
	options?: BufferOptions
): Promise<Blob> => {
	const fonts = {
		Roboto: {
			// Only Roboto work? I used "Hind"
			normal: 'src/lib/assets/fonts/hind/OTF/Hind-Regular.otf',
			bold: 'src/lib/assets/fonts/hind/OTF/Hind-Bold.otf'
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
