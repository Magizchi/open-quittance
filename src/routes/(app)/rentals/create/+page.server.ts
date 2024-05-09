import db from '$lib/server/database.js';
import { propertiesTable, rentalsTable, tenantsTable } from '$lib/server/schema.js';
import dayjs from 'dayjs';
import { eq } from 'drizzle-orm';

type newRentalType = typeof rentalsTable.$inferInsert;

export const load = async ({ parent }) => {
    await parent();

    const rentals = (await db.select()
        .from(rentalsTable)
        .leftJoin(propertiesTable, eq(rentalsTable.property_id, propertiesTable.id))
        .leftJoin(tenantsTable, eq(rentalsTable.tenant_id, tenantsTable.id))
    );

    const properties = (await db.select({
        propertyId: propertiesTable.id,
        name: propertiesTable.name,
        city: propertiesTable.city
    })
        .from(propertiesTable)
    ).map(item => {
        const test = rentals.filter(({ properties }) => properties?.id === item.propertyId);

        if (test.length > 0) {
            return ({
                value: item.propertyId,
                label: `${item.name}:${item.city}`,
                description: test[0].tenants?.fullName
            });
        }
        return ({
            value: item.propertyId,
            label: `${item.name}:${item.city}`,
        });
    });

    const tenants = (await db.select({
        companyName: tenantsTable.companyName,
        fullName: tenantsTable.fullName,
        id: tenantsTable.id,
    })
        .from(tenantsTable) as unknown as { id: string, fullName: string; companyName: string; }[])
        .map(item => ({
            value: item.id,
            label: item.companyName !== '' ? item?.companyName : item.fullName
        }));

    return { properties, tenants };
};


export const actions = {
    create: async ({ request }) => {
        const data = await request.formData();
        if (
            data.get('property') === "" ||
            data.get('tenant') === "" ||
            data.get('date') === ""
        ) {
            return {
                success: false,
                status: 400,
                message: "Erreur dans les données"
            };
        }

        const newRental: newRentalType = {
            tenant_id: +data.get('tenant')!.toString(),
            property_id: +data.get('property')!.toString(),
            startedAt: dayjs(data.get('data')?.toString()).toDate()

        };

        try {
            await db.insert(rentalsTable).values(newRental);
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