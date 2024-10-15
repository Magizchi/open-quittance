import FormDataToJson from '$lib/utils/FormDataToJson.js';
import { redirect } from '@sveltejs/kit';
import db from '$lib/db/drizzle';
import { tenantsTable } from '$lib/db/schema.js';
import { createNotification } from '$lib/stores/notification/store.js';
import { Routes } from '$lib/constants/routes.js';

export const load = async ({ parent }) => {
	await parent();
};

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const { name, address, city, postalCode } = FormDataToJson(data);
		if (name === '' || address === '' || city === '' || postalCode === '') {
			createNotification({ message: 'Erreur dans les données', status: 400, success: false });
			return {
				success: false,
				status: 400,
				message: 'Erreur dans les données'
			};
		}

		try {
			await db.insert(tenantsTable).values({
				name,
				address,
				city,
				postalCode
			});
		} catch (err) {
			createNotification({ message: 'Erreur dans les données', status: 400, success: false });
			return {
				success: false,
				status: 400,
				message: 'Erreur:' + err
			};
		}

		createNotification({ message: 'Locataire créé', status: 200, success: true });
		throw redirect(303, Routes.tenants);
	}
};
