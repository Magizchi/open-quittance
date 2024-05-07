import db from '$lib/server/database';
import { tenantsTable } from '$lib/server/schema.js';

export const load = async ({ parent }) => {
    await parent();
    const tenants = await db.select().from(tenantsTable);
    return { tenants };
};
