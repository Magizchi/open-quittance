import db from '$lib/server/database';
import { landlordsTable, propertiesTable } from '$lib/server/schema.js';
import FormatFormData from '$lib/utils/FormatFormData.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ parent }) => {
    await parent();
    const landlords = await db.select().from(landlordsTable);

    const landlordsOptions = (await db.select({
        value: landlordsTable.id,
        name: landlordsTable!.name,
    }).from(landlordsTable) as unknown as { value: string, name: string; }[]).map(item => ({
        value: item.value,
        label: item.name
    }));

    return { landlords, landlordsOptions };
};

export const actions = {
    create: async ({ request }) => {
        const data = await request.formData();

        const { landlord, error } = FormatFormData(data);

        if (error.status) return {
            success: false,
            status: 400,
            message: "Erreur:" + error.message
        };

        try {
            await db.transaction(async (tx) => {
                //Save the landlords first to give the ID 
                await tx.insert(landlordsTable).values(landlord);
                //Add the new landlord Id to the properties before save
                // properties.forEach(item => item['landlord_id'] = savedLandlord.insertId);
                // const [saveProperties] = await tx.insert(propertiesTable).values(properties);

            });
            return {
                success: true,
                status: 302,
                message: 'Created'
            };
        } catch (err) {
            return {
                success: false,
                status: 400,
                message: "Erreur:" + err
            };
        }

        redirect(302, '/landlords/9');
    },

    add: async ({ request }) => {
        const data = await request.formData();
        const { properties, error } = FormatFormData(data);

        if (error.status) return error;

        try {
            await db.insert(propertiesTable).values(properties);
            return {
                success: true,
                status: 201,
                message: "Saved"
            };
        } catch (err) {
            return {
                success: false,
                status: 400,
                message: "Erreur:" + err
            };
        }

    }
};