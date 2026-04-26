import db from "$lib/db/drizzle"
import {  usersTable } from "$lib/db/schema"
import { eq } from "drizzle-orm";

export const load = async ({locals}) => {

     const [landlord] = await db
     .select()
     .from(usersTable)
     .where(eq(usersTable.id, locals.user!.id))

     return landlord
    
}