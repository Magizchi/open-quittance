import { GetProperties } from '$lib/utils/service/properties/index.js';


export const load = async ({ parent }) => {
    await parent();

    const properties = await GetProperties();
    return { properties };
};
