import type { receiptsTable } from '$lib/db/schema';

type ReceiptType = typeof receiptsTable.$inferSelect;

export default interface ReceiptsModel extends ReceiptType {}
