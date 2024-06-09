import type { landlordsTable } from "$lib/server/schema";

type landlordType = typeof landlordsTable.$inferSelect;

export default interface LandlordModel extends landlordType { }