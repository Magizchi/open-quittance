import type { landlordsTable } from '$lib/db/schema';

type landlordType = typeof landlordsTable.$inferSelect;

export default interface LandlordModel extends landlordType {}
