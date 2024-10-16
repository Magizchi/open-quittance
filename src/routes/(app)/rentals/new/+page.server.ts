import FormDataToJson from '$lib/utils/FormDataToJson.js';
import { redirect } from '@sveltejs/kit';
import db from '$lib/db/drizzle';
import { propertiesTable, rentalsTable, tenantsTable } from '$lib/db/schema.js';
import dayjs from 'dayjs';
import { eq } from 'drizzle-orm';

export const load = async ({ parent }) => {
	await parent();
	const propertiesOptions = (
		await db
			.select()
			.from(propertiesTable)
			.leftJoin(rentalsTable, eq(propertiesTable.id, rentalsTable.property_id))
	).map((element) => ({ label: element.properties.name, value: element.properties.id }));
	const tenantsOptions = (await db.select().from(tenantsTable)).map((element) => ({
		label: element.name,
		value: element.id
	}));

	return { propertiesOptions, tenantsOptions };
};

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const { property, tenant, date } = FormDataToJson(data);

		try {
			await db.insert(rentalsTable).values({
				property_id: +property,
				tenant_id: +tenant,
				startedAt: dayjs(date.toString()).toDate()
			});
		} catch (err) {
			return {
				message: 'err' + err,
				success: false,
				status: 400
			};
		}

		throw redirect(303, '/');
	}
};
