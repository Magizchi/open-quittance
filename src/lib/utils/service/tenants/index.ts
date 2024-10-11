import db from "$lib/server/database";
import { tenantsTable } from "$lib/server/schema";

export const GetTenants = (page: number = 1, show: number = 12) => {
    return db.select().from(tenantsTable).limit(show).offset(show * (page - 1));
};