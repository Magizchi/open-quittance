import db from '$lib/server/database.js';
import { landlordsTable, propertiesTable, rentalsTable } from '$lib/server/schema.js';
import FormatFormData from "$lib/utils/FormatFormData.js";
import { eq } from 'drizzle-orm';

export const load = async ({ params }) => {
    const [landlord] = await db.select().from(landlordsTable).where(eq(landlordsTable.id, +params.id));

    const landlordProperties =
        await db.select()
            .from(propertiesTable)
            .where(eq(propertiesTable.landlord_id, landlord.id));

    const landlordRentals =
        await db.select()
            .from(rentalsTable)
            .leftJoin(propertiesTable, eq(rentalsTable.property_id, propertiesTable.id))
            .where(eq(propertiesTable.landlord_id, landlord.id));

    return { landlord, properties: landlordProperties, rentals: landlordRentals };
};

export const actions = {
    updateProperty: async ({ request }) => {
        const data = await request.formData();
        const { error, properties } = FormatFormData(data);

        if (error.status) return error;

        const { id, ...prop } = properties[0];

        try {
            await db.update(propertiesTable).set(prop).where(eq(propertiesTable.id, id!));
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
