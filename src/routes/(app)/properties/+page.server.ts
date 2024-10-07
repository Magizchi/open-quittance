import db from '$lib/server/database';
import { propertiesTable } from '$lib/server/schema.js';


export const load = async ({ parent }) => {
    await parent();

    const properties = await db.select().from(propertiesTable);
    return { properties };
};
