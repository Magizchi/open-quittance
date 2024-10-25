import type { tenantsTable } from "$lib/db/schema";

export type tenantType = typeof tenantsTable.$inferSelect;
