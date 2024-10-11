import type { tenantsTable } from "$lib/server/schema";

type tenantType = typeof tenantsTable.$inferSelect;

export default interface TenantModel extends tenantType { }