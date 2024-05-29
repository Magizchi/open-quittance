import db from '$lib/server/database';
import { tenantsTable } from '$lib/server/schema.js';

export const load = async ({ parent }) => {
    await parent();
    const tenants = await db.select().from(tenantsTable);
    return { tenants };
};

export const actions = {
    create: async ({ request }) => {
        const data = await request.formData();

        if (
            data.get('name') === '' ||
            data.get('address') === '' ||
            data.get('city') === '' ||
            data.get('postalCode') === ''
        ) {
            return {
                success: false,
                status: 400,
                message: "Erreur dans les données"
            };
        }

        try {
            await db.insert(tenantsTable).values({
                name: data.get('name')!.toString(),
                address: data.get('address')!.toString(),
                city: data.get('city')!.toString(),
                postalCode: data.get('postalCode')!.toString(),
            });
        } catch (err) {
            return {
                success: false,
                status: 400,
                message: "Erreur:" + err
            };
        }
    }
};