import { GetTenants } from '$lib/utils/service/tenants/index.js';

export const load = async ({ parent }) => {
    await parent();
    const tenants = await GetTenants();
    return { tenants };
};