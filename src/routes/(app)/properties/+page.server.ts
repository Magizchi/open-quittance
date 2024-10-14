import { getProperties } from '$lib/utils/service/properties/index.js';

export const load = async ({ parent, url }) => {
	await parent();

	const page = url.searchParams.get('page') ? Number(url.searchParams.get('page')) : 1;
	const show = url.searchParams.get('show') ? Number(url.searchParams.get('show')) : 12;

	const properties = await getProperties(page, show);

	return { properties };
};
