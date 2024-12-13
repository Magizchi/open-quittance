// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { NumberToLetter } from "convertir-nombre-lettre";
import dayjs from "dayjs";
import type { Style, TDocumentDefinitions } from "pdfmake/interfaces";
import "dayjs/locale/fr";
dayjs.locale("fr");

const Space = (spaceSize: number) => ({
  text: " ",
  lineHeight: spaceSize,
});

const Text = (text: string, decoration?: Style) => ({
  text,
  lineHeight: 1.3,
  // font: "Hind",
  bold: false,
  ...decoration,
});

/**
 * Its default template for receipt pdf document
 * @param info = Rental, Tenant, Landlord, properties to create receipt
 * @returns
 */
const docDefinition = (info: {
  id: number;
  number: string;
  //Id de la location
  rental_id: number | null;
  //Locataire
  tenant_id: number;
  tenant_fullName: string;
  tenant_address: string;
  tenant_city: string;
  tenant_postalCode: string;
  //Propriété
  property_address: string;
  property_city: string;
  property_postalCode: string;
  //Bailleur
  landlord_id: number;
  landlord_fullName: string;
  landlord_address: string;
  landlord_city: string;
  landlord_postalCode: string;
  //loyer
  rent: number;
  condo_fees: number;
  //Periode
  startDate: Date;
  endDate: Date;
  taxes: number;
  // date de paiment et création
  paymentDate: Date | null;
  createAt: Date | null;
}): TDocumentDefinitions => ({
  watermark: {
    text: "",
    // font: "Hind",
  },
  content: [
    Text(
      `Quittance de loyer du mois de ${dayjs(info.startDate).locale("fr").format("MMMM").toUpperCase()}`,
      {
        fontSize: 22,
        bold: true,
        lineHeight: 2,
        alignment: "center",
      }
    ),
    // Owner
    Text("Propriétaire", { bold: true }),
    Text(info.landlord_fullName),
    Text(info.landlord_address),
    Text(`${info.landlord_city} ${info.landlord_postalCode}`),
    // Tenants
    {
      columns: [
        {
          width: "*",
          text: "",
        },
        {
          width: "*",
          text: "",
        },
        {
          width: "*",
          text: "",
        },
        {
          width: "auto",
          stack: [
            Text("Locataire", { bold: true }),
            Text(info.tenant_fullName),
            Text(info.tenant_address),
            Text(`${info.tenant_city} ${info.tenant_postalCode}`),
          ],
        },
      ],
      // optional space between columns
      columnGap: 8,
    },
    Space(2),
    Text("Adresse de location :", { decoration: "underline", bold: true }),
    Text(
      `${info.property_address}, ${info.property_postalCode} ${info.property_city}`,
      {
        alignment: "left",
      }
    ),
    Space(2),
    {
      text: [
        `Reçus de ${info.tenant_fullName} `,
        "la somme de ",
        { text: info.rent + info.condo_fees, bold: true },
        ` euros (${NumberToLetter(
          info.rent + info.condo_fees
        )} euros), au titre du paiement du loyer et des charges du local au `,
        {
          text: `${info.property_address}, ${info.property_postalCode} ${info.property_city}`,
          bold: true,
        },
        ` pour la période de location du ${dayjs(info.startDate).format("DD/MM/YYYY")} au ${dayjs(
          info.endDate
        ).format(
          "DD/MM/YYYY"
        )} et lui en donne quittance, sous réserve de tous mes droits.`,
      ],
      alignment: "justify",
      lineHeight: 1.3,
    },
    Space(3),
    Text("Détail du règlement :", { decoration: "underline", bold: true }),
    Space(1),
    {
      columns: [
        {
          width: "*",
          stack: [Text("Loyer:"), Text("Provision de charge:"), Text(`Total:`)],
        },
        {
          width: "*",
          stack: [
            Text(`${info.rent} €`, { alignment: "right" }),
            Text(`${info.condo_fees + info.taxes} €`, { alignment: "right" }),
            Text(`${info.rent + info.condo_fees + info.taxes} €`, {
              alignment: "right",
            }),
          ],
        },
        {
          width: "*",
          text: "",
        },
        {
          width: "*",
          text: "",
        },
      ],
      // optional space between columns
      columnGap: 8,
    },
    Space(3),
    {
      columns: [
        {
          width: "*",
          stack: [
            Text(
              `Date de paiement : ${
                info.paymentDate
                  ? dayjs(info.paymentDate).format("DD/MM/YYYY")
                  : "Paiement non reçu"
              }`
            ),
          ],
        },
        {
          width: "*",
          text: "",
        },
        {
          width: "*",
          stack: [
            Text(
              `Fait à ${info.landlord_city}, le ${dayjs(info.createAt).format("DD/MM/YYYY")}`
            ),
            Text("Signature"),
          ],
        },
      ],
      // optional space between columns
      columnGap: 8,
    },
    Space(9),
    Text(
      "Cette quittance annule tous les reçus qui auraient pu être établis précédemment en cas de paiement partiel du montant du présent terme. Elle est à conserver pendant trois ans par le locataire (loi n° 89-462 du 6 juillet 1989: art. 7-1).",
      {
        fontSize: 8,
        lineHeight: 1,
        alignment: "left",
      }
    ),
  ],
  // styles: {
  //   Hind: {
  //     font: "Hind",
  //     bold: false
  //   },
  // },
});

export default docDefinition;
