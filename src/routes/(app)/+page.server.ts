import ReceiptsModel from '$lib/models/receipts.model.js';
import { generateNewReceipts, getReceipts, addPaymentDate } from '$lib/utils/service/receipts';

export const load = async ({ parent, url }) => {
	await parent();

	await generateNewReceipts();

	const page = url.searchParams.get('page') ? Number(url.searchParams.get('page')) : 1;
	const show = url.searchParams.get('show') ? Number(url.searchParams.get('show')) : 12;

	const receiptList: ReceiptsModel[] = await getReceipts(page, show);

	return { receiptList };
};

export const actions = {
	paymentDate: async ({ request }) => {
		return await addPaymentDate(request);
	}
};
