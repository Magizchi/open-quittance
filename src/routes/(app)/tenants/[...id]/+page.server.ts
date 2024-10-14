import FormDataToJson from '$lib/utils/FormDataToJson.js';
import { redirect } from '@sveltejs/kit';
import db from '$lib/server/database';
import { tenantsTable } from '$lib/server/schema.js';
import { eq } from 'drizzle-orm';
import { Routes } from '$lib/constants/routes';
import { createNotification } from '$lib/stores/notification/store.js';

export const load = async ({ parent, params }) => {
	await parent();

	const [tenant] = await db.select().from(tenantsTable).where(eq(tenantsTable.id, +params.id));

	if (!tenant) {
		throw redirect(303, Routes.tenants);
	}

	return { tenant };
};

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const { id, name, address, city, postalCode } = FormDataToJson(data);

		try {
			await db
				.update(tenantsTable)
				.set({
					name,
					address,
					city,
					postalCode
				})
				.where(eq(tenantsTable.id, +id));
		} catch (err) {
			return {
				message: 'err' + err,
				success: false,
				status: 400
			};
		}
		createNotification({ message: `Locataire ${name} a bien été modifié`, success: true });
		throw redirect(303, Routes.tenants);
	}
};
