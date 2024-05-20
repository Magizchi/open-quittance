import db from '$lib/server/database';
import { landlordsTable, propertiesTable } from '$lib/server/schema.js';
type landlordType = typeof landlordsTable.$inferInsert;
type propertyType = typeof propertiesTable.$inferInsert;

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

        const landlord: landlordType = {} as landlordType;
        const properties: propertyType[] = [] as propertyType[];

        // Create object Landlord and Array of properties with formData
        for (const key of data.keys()) {

            if (key === '' || data.get(key) === '' || data.get(key) === null) {
                return {
                    success: false,
                    status: 400,
                    message: "Erreur dans les données"
                };
            }

            if (key.includes('postalCode')) {
                if (data.get(key)!.toString().length > 5) {
                    return {
                        success: false,
                        status: 400,
                        message: "Erreur dans les données"
                    };
                }
            }

            const match = key.match(/^properties\[(\d+)\]\[(.+)\]$/);
            if (match) {
                const index = parseInt(match[1], 10);
                const prop = match[2];

                if (!properties[index]) {
                    properties[index] = {} as propertyType;
                }
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                properties[index][prop] = data.get(key)!.toString();
            } else {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                landlord[key] = data.get(key)!.toString();
            }
        }

        await db.transaction(async (tx) => {
            const [savedLandlord] = await tx.insert(landlordsTable).values(landlord);
            console.log('l', savedLandlord);
            properties.forEach(item => item['landlord_id'] = savedLandlord.insertId);
            const [saveProperties] = await tx.insert(propertiesTable).values(properties);

            return {
                landlord: savedLandlord,
                properties: saveProperties
            };
        });
    },
};