import db from "$lib/server/database";
import { propertiesTable } from "$lib/server/schema";

/**
 * Function get receipts
 * @param page default: 1
 * @param show default: 12
 * @returns 
 */
export const GetProperties = async (page: number = 1, show: number = 12) => {
    return db.select().from(propertiesTable).limit(show).offset(show * (page - 1));
};