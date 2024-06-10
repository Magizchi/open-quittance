import db from '$lib/server/database';
import { landlordsTable, propertiesTable, rentalsTable, tenantsTable } from '$lib/server/schema';
import dayjs from 'dayjs';
import { eq } from 'drizzle-orm';

export const load = async () => {
    const rentals =
        await db.select({
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
            .leftJoin(landlordsTable, eq(propertiesTable.landlord_id, landlordsTable.id));

    const propertiesOptions = (
        await db.select({
            propertyId: propertiesTable.id,
            name: propertiesTable.name,
            city: propertiesTable.city
        })
            .from(propertiesTable)
    ).map(item => {
        const test = rentals.filter(({ property }) => property?.id === item.propertyId);

        if (test.length > 0) {
            return ({
                value: item.propertyId,
                label: `${item.name}:${item.city}`,
                description: test[0].tenant?.name
            });
        }
        return ({
            value: item.propertyId,
            label: `${item.name}:${item.city}`,
        });
    });

    const tenantsOptions = (await db.select({
        name: tenantsTable.name,
        id: tenantsTable.id,
    })
        .from(tenantsTable) as unknown as { id: string, name: string; }[])
        .map(item => ({
            value: item.id,
            label: item.name
        }));
    return { rentals, propertiesOptions, tenantsOptions };
};

export const actions = {
    create: async ({ request }) => {
        const data = await request.formData();

        if (
            data.get('property') === '' ||
            data.get('tenant') === '' ||
            data.get('date') === ''
        ) {
            return {
                success: false,
                status: 400,
                message: 'Erreur dans les données'
            };
        }
        try {
            console.log('ici', data.get('tenant'), data.get('property'));
            await db.insert(rentalsTable).values({
                tenant_id: +data.get('tenant')!.toString(),
                property_id: +data.get('property')!.toString(),
                startedAt: dayjs(data.get('date')!.toString()).toDate()
            });
        } catch (err) {
            return {
                success: false,
                status: 400,
                message: 'Erreur:' + err
            };
        }
    },
    delete: async ({ request }) => {
        const data = await request.formData();
        console.log('daata', data);

        if (data.get('endDate') === '' || data.get('rentalId') === '') {
            return {
                success: false,
                status: 400,
                message: 'Erreur dans les données'
            };
        }

        try {
            await db.update(rentalsTable).set({ endDate: dayjs(data.get('endDate')!.toString()).toDate() }).where(eq(rentalsTable.id, +data.get('rentalId')!.toString()));
        } catch (err) {
            return {
                success: false,
                status: 400,
                message: 'Erreur:' + err
            };
        }
    }
};