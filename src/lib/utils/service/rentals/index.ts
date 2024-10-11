import db from "$lib/server/database";
import { landlordsTable, propertiesTable, rentalsTable, tenantsTable } from "$lib/server/schema";
import { eq } from "drizzle-orm";

/**
 * Function get receipts
 * @param page default: 1
 * @param show default: 12
 * @returns 
 */
export const GetRentals = async (page: number = 1, show: number = 12) => {
    return db.select({
        tenant: {
            id: tenantsTable.id,
            name: tenantsTable.name,

        },
        landlord: {
            id: landlordsTable.id,
            name: landlordsTable.name,
        },
        property: {
            id: propertiesTable.id,
            name: propertiesTable.name,
            city: propertiesTable.city
        },
        rentalId: rentalsTable.id,
        startDate: rentalsTable.startedAt,
        endDate: rentalsTable.endDate
    }).from(rentalsTable)

        .leftJoin(tenantsTable, eq(rentalsTable.tenant_id, tenantsTable.id))
        .leftJoin(propertiesTable, eq(rentalsTable.property_id, propertiesTable.id))
        .leftJoin(landlordsTable, eq(propertiesTable.landlord_id, landlordsTable.id))

        .limit(show).offset(show * (page - 1));
};