import type { receiptsTable } from "$lib/db/schema";

export type ReceiptsModel = typeof receiptsTable.$inferSelect;
