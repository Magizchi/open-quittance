import type { propertiesTable } from "$lib/server/schema";

type propertyType = typeof propertiesTable.$inferSelect;

export default interface PropertyModel extends propertyType { }