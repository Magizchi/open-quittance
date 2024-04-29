import db from '$lib/server/database';
import { landlordsTable, propertiesTable, rentalsTable, tenantsTable } from '$lib/server/schema';
import { eq } from 'drizzle-orm';

export const load = async () => {
    const rentals =
        await db.select({
            tenant: {
                id: tenantsTable.id,
                companyName: tenantsTable.companyName,
                fullName: tenantsTable.fullName,
            },
            landlord: {
                id: landlordsTable.id,
                fullName: landlordsTable.fullName,
                companyName: landlordsTable.companyName,
            },
            property: {
                id: propertiesTable.id,
                name: propertiesTable.name,
                city: propertiesTable.city
            }
        }).from(rentalsTable)
            .leftJoin(tenantsTable, eq(rentalsTable.tenant_id, tenantsTable.id))
            .leftJoin(propertiesTable, eq(rentalsTable.property_id, propertiesTable.id))
            .leftJoin(landlordsTable, eq(propertiesTable.landlord_id, landlordsTable.id));

    return { rentals };
};