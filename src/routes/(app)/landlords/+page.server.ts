import db from '$lib/server/database';
import { landlordsTable } from '$lib/server/schema.js';

export const load = async ({ parent }) => {
    await parent();
    const landlords = await db.select().from(landlordsTable);
    return { landlords };
};
