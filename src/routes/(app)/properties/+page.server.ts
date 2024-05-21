import db from '$lib/server/database';
import { landlordsTable, propertiesTable } from '$lib/server/schema.js';
import { eq } from 'drizzle-orm';

export const load = async ({ parent }) => {
    await parent();
    const properties = await db.select({
        landlord: landlordsTable.companyName ?? landlordsTable.fullName,
        landlordId: landlordsTable.id,
        propertyId: propertiesTable.id,
        name: propertiesTable.name,
        address: propertiesTable.address,
        city: propertiesTable.city,
        postalCode: propertiesTable.postalCode,
        rent: propertiesTable.rent,
        condoFees: propertiesTable.condo_fees,
        taxes: propertiesTable.taxes
    }).from(propertiesTable)
        .leftJoin(landlordsTable, eq(propertiesTable.landlord_id, landlordsTable.id));

    return { properties };
};
