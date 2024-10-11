import { ReceiptsModel } from "$lib/models";
import { GetReceipts } from "$lib/utils/service/receipts/index.js";

export async function GET({ url }) {
    try {
        const page = url.searchParams.get('page');
        const show = url.searchParams.get('show');

        if (page === '' || page === null || show === '' || show === null) {
            return new Response(null, { status: 404 });
        }
        const receiptList: ReceiptsModel[] = await GetReceipts(+page, +show);

        return new Response(JSON.stringify(receiptList), { status: 200 });
    } catch (err) {
        return new Response(null, { status: 404 });
    }
}