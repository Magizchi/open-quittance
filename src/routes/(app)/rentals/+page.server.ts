import db from '$lib/db/drizzle';
import { landlordsTable, propertiesTable, rentalsTable, tenantsTable } from '$lib/db/schema';
import dayjs from 'dayjs';
import { eq } from 'drizzle-orm';

export const load = async () => {
	const rentals = await db
		.select()
		.from(rentalsTable)
		.innerJoin(tenantsTable, eq(rentalsTable.tenant_id, tenantsTable.id))
		.innerJoin(propertiesTable, eq(rentalsTable.property_id, propertiesTable.id))
		.innerJoin(landlordsTable, eq(propertiesTable.landlord_id, landlordsTable.id));

	const propertiesOptions = (
		await db
			.select({
				propertyId: propertiesTable.id,
				name: propertiesTable.name,
				city: propertiesTable.city
			})
			.from(propertiesTable)
	).map((item) => {
		const allReadyRented = rentals.filter(({ properties }) => properties.id === item.propertyId);

		if (allReadyRented.length > 0) {
			return {
				value: item.propertyId,
				label: `${item.name}:${item.city}`,
				description: allReadyRented[0].tenants?.name
			};
		}
		return {
			value: item.propertyId,
			label: `${item.name}:${item.city}`
		};
	});

	const tenantsOptions = (
		(await db
			.select({
				name: tenantsTable.name,
				id: tenantsTable.id
			})
			.from(tenantsTable)) as unknown as { id: string; name: string }[]
	).map((item) => {
		const checkIsRenter = rentals.filter(({ tenants }) => tenants.id === +item.id);
		if (checkIsRenter.length > 0) {
			return {
				value: item.id,
				label: item.name,
				description: checkIsRenter[0].properties?.name
			};
		}
		return {
			value: item.id,
			label: item.name
		};
	});
	return { rentals, propertiesOptions, tenantsOptions };
};

export const actions = {
	delete: async ({ request }) => {
		const data = await request.formData();

		if (data.get('endDate') === '' || data.get('rentalId') === '') {
			return {
				success: false,
				status: 400,
				message: 'Erreur dans les données'
			};
		}

		try {
			await db
				.update(rentalsTable)
				.set({ endDate: dayjs(data.get('endDate')!.toString()).toDate() })
				.where(eq(rentalsTable.id, +data.get('rentalId')!.toString()));
		} catch (err) {
			return {
				success: false,
				status: 400,
				message: 'Erreur:' + err
			};
		}
	}
};
