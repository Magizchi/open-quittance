import db from '$lib/server/database';
import { tenantsTable } from '$lib/server/schema.js';

export const load = async ({ parent, url }) => {
	await parent();

	const page = url.searchParams.get('page') ? Number(url.searchParams.get('page')) : 1;
	const show = url.searchParams.get('show') ? Number(url.searchParams.get('show')) : 12;

	const tenants = await db.select()
		.from(tenantsTable)
		.limit(show)
		.offset(show * (page - 1));

	return { tenants };
};
