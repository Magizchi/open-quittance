import type { propertiesTable } from "$lib/db/schema";

export type PropertyModel = typeof propertiesTable.$inferSelect;
