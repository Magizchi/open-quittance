import ReceiptsModel from '$lib/models/receipts.model.js';
import { GenerateNewReceipts, GetReceipts, addPaymentDate } from '$lib/utils/service/receipts';

export const load = async ({ parent }) => {
    await parent();

    await GenerateNewReceipts();

    const receiptList: ReceiptsModel[] = await GetReceipts();

    return { receiptList };
};

export const actions = {
    paymentDate: async ({ request }) => {
        return await addPaymentDate(request);
    }
};