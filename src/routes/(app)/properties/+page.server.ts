import db from '$lib/db/drizzle';
import { propertiesTable } from '$lib/db/schema.js';

export const load = async ({ parent, url }) => {
	await parent();

	const page = url.searchParams.get('page') ? Number(url.searchParams.get('page')) : 1;
	const show = url.searchParams.get('show') ? Number(url.searchParams.get('show')) : 12;

	const properties = await db
		.select()
		.from(propertiesTable)
		.limit(show)
		.offset(show * (page - 1));

	return { properties };
};
