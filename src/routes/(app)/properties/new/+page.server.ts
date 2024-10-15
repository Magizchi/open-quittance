import FormDataToJson from '$lib/utils/FormDataToJson.js';
import { redirect } from '@sveltejs/kit';
import db from '$lib/db/drizzle';
import { propertiesTable } from '$lib/db/schema.js';
import { Routes } from '$lib/constants/routes.js';

export const load = async ({ parent }) => {
	await parent();
};

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const { name, address, city, rent, condo_fees, taxes, postalCode } = FormDataToJson(data);

		try {
			await db.insert(propertiesTable).values({
				landlord_id: 1,
				name,
				address,
				city,
				rent: +rent,
				condo_fees: +condo_fees,
				taxes: +taxes,
				postalCode
			});
		} catch (err) {
			return {
				message: 'err' + err,
				success: false,
				status: 400
			};
		}

		throw redirect(303, Routes.properties);
	}
};
