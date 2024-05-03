// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { NumberToLetter } from 'convertir-nombre-lettre';
import dayjs from "dayjs";
import type { Style, TDocumentDefinitions } from "pdfmake/interfaces";

const Space = (spaceSize: number) => ({
    text: ' ', lineHeight: spaceSize
});

const Text = (text: string, decoration?: Style) => ({
    text, lineHeight: 1.3, ...decoration
});

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
    content: [
        Text('QUITTANCE DE LOYER', {
            fontSize: 30,
            bold: true,
            lineHeight: 3,
            alignment: 'center',
        }),
        // Owner
        Text('Propriétaire', { bold: true }),
        Text(info.landlord_fullName),
        Text(info.landlord_address),
        Text(`${info.landlord_city} ${info.landlord_postalCode}`),
        // Tenants
        {
            columns: [
                {
                    width: '*',
                    text: ''
                },
                {
                    width: '*',
                    text: ''
                },
                {
                    width: '*',
                    text: ''
                },
                {
                    width: 'auto',
                    stack: [
                        Text('Locataire', { bold: true }),
                        Text(info.tenant_fullName),
                        Text(info.tenant_address),
                        Text(`${info.tenant_city} ${info.tenant_postalCode}`),
                    ],
                }
            ],
            // optional space between columns
            columnGap: 10
        },
        Space(2),
        {
            text: [
                `Quittance de loyer du mois de `,
                {
                    text: `${dayjs().locale('fr').format('MMMM').toUpperCase()}`,
                    bold: true
                }
            ],
            lineHeight: 1.3
        }
        ,
        Space(2),
        Text('Adresse de location :', { decoration: 'underline' }),
        Space(2),
        Text(`${info.property_address}, ${info.property_city} ${info.property_postalCode}`, { alignment: 'center' }),
        Space(2),
        {
            text: [
                `Reçus de ${info.tenant_fullName} `,
                ' la somme de ', { text: info.rent + info.condo_fees, bold: true },
                ` euros (${NumberToLetter(info.rent + info.condo_fees)} euros), au titre du paiement du loyer et des charges du local sis `,
                { text: `${info.property_address} ${info.property_city} ${info.property_postalCode}`, bold: true },
                ` pour la période de location du ${dayjs(info.startDate).format('DD/MM/YYYY')} au ${dayjs(info.endDate).format('DD/MM/YYYY')} et lui en donne quittance, sous réserve de tous mes droits.`
            ],
            alignment: 'justify',
            lineHeight: 1.3
        },
        Space(3),
        Text('Détail du règlement :', { decoration: 'underline' }),
        Space(1),
        Text(`Loyer : ${info.rent} €`),
        Text(`Provision de charge : ${info.condo_fees} €`),
        Text(`Total : ${info.rent + info.condo_fees} €`),
        Text(`Date de paiement : ${info.paymentDate ? dayjs(info.paymentDate).format('DD/MM/YYYY') : 'Paiement non reçu'}`),
        Space(2),
        Text(`Fait à Bobigny le ${dayjs(info.createAt).format('DD/MM/YYYY')}`),
        Text('Signature'),
    ]
});


export default docDefinition;