import db from '$lib/server/database.js';
import { landlordsTable, propertiesTable, rentalsTable, tenantsTable } from '$lib/server/schema.js';
import { eq } from 'drizzle-orm';


export const load = async ({ parent }) => {
    await parent();

    const rentalList =
        (await db.select().from(rentalsTable)
            .rightJoin(tenantsTable, eq(rentalsTable.tenant_id, tenantsTable.id))
            .rightJoin(propertiesTable, eq(rentalsTable.property_id, propertiesTable.id))
            .rightJoin(landlordsTable, eq(propertiesTable.landlord_id, landlordsTable.id)))
            .map(item => {
                if (item.tenants) {
                    return ({
                        value: item.rentals?.id,
                        label: `${item.tenants?.name} ${item.landlords.name}`
                    });
                }
            }).filter(item => item);


    return { rentalList };
};