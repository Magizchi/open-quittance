import db from "$lib/db/drizzle";
import { receiptsTable } from "$lib/db/schema";
import docDefinition from "$lib/components/templates/pdf-quittance-template";
import GeneratePdf from "$lib/server/receipts/PdfGenerator";
import { json } from "@sveltejs/kit";
import dayjs from "dayjs";
import { eq } from "drizzle-orm";

export async function GET({ url }) {
  const receiptId = url.searchParams.get("receiptId");

  if (!receiptId) {
    return json({ message: "Manque param" }, { status: 400 });
  }
  if (isNaN(+receiptId)) {
    return json({ message: "Param doit être un nombre" }, { status: 400 });
  }

  const [receipt] = await db
    .select()
    .from(receiptsTable)
    .where(eq(receiptsTable.id, +receiptId));

  if (!receipt) {
    return json({ message: "Cette quittance n'existe pas" }, { status: 404 });
  }

  const pdfData = docDefinition(receipt);

  let documentName: string = "";

  if (receipt.paymentDate === null) {
    documentName =
      receipt.tenant_fullName.replaceAll(" ", "-") + "-" + "reste-a-payer";
  } else {
    documentName = `${receipt.tenant_fullName.replaceAll(" ", "-")}-${dayjs(
      receipt.paymentDate
    ).format("MMMM")}-${dayjs(receipt.paymentDate).get("year")}`;
  }

  const GeneratedPdf = GeneratePdf(pdfData);
  await GeneratedPdf.write(`pdfs/${documentName}.pdf`);

  const pdfBlob = await GeneratedPdf.getBuffer();

  return new Response(pdfBlob as any, {
    status: 200,
    headers: {
      "content-type": "application/pdf",
      "document-name": documentName,
    },
  });
}
