import type { tenantsTable } from '$lib/db/schema';

type tenantType = typeof tenantsTable.$inferSelect;

export default interface TenantModel extends tenantType {}
