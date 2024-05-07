import db from '$lib/server/database.js';
import { tenantsTable } from '$lib/server/schema.js';

type TenantsType = typeof tenantsTable.$inferInsert;


export const actions = {
    create: async ({ request }) => {
        const data = await request.formData();

        if (
            data.get('fullName') === "" ||
            data.get('address') === "" ||
            data.get('city') === "" ||
            data.get('postalCode') === ""
        ) {
            return {
                success: false,
                status: 400,
                message: "Erreur dans les données"
            };
        }
        if (data.get('postalCode')!.toString().length > 5) {
            return {
                success: false,
                status: 400,
                message: "Erreur dans les données"
            };
        }
        const newLandlord: TenantsType = {
            companyName: data.get('companyName')?.toString(),
            siret: data.get('siret')?.toString(),
            fullName: data.get('fullName')!.toString(),
            address: data.get('address')!.toString(),
            postalCode: data.get('postalCode')!.toString(),
            city: data.get('city')!.toString()
        };

        try {
            await db.insert(tenantsTable).values(newLandlord);
            return {
                success: true,
                status: 200,
                message: "Propriété enregister"
            };

        } catch (err) {
            return {
                success: false,
                status: 400,
                message: err
            };
        }

    }
};