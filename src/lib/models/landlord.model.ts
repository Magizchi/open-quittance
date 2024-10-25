import type { landlordsTable } from "$lib/db/schema";

export type LandlordModel = typeof landlordsTable.$inferSelect;
