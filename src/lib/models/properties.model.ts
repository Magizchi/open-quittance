import type { propertiesTable } from '$lib/db/schema';

type propertyType = typeof propertiesTable.$inferSelect;

export default interface PropertyModel extends propertyType {}
