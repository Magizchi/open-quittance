import db from '$lib/server/database'
import { companiesTable } from '$lib/server/schema.js';
import { eq } from 'drizzle-orm';
import CheckToken from '$lib/utils/CheckToken'

export const load = async ({ parent, cookies }) => {
    await parent();
    const userInfo = CheckToken(cookies)
    const result = await db.select().from(companiesTable).where(eq(companiesTable.userId, userInfo.id));
    return { owners: result }
}
