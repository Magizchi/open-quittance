import RentalModel from '$lib/models/rental.model.js';
import { GetRentals } from '$lib/utils/service/rentals/index.js';

export async function GET({ url }) {
    try {
        const page = url.searchParams.get('page');
        const show = url.searchParams.get('show');

        if (page === '' || page === null || show === '' || show === null) {
            return new Response(null, { status: 404 });
        }
        const tenantsList: RentalModel[] = await GetRentals(+page, +show);

        return new Response(JSON.stringify(tenantsList), { status: 200 });
    } catch (err) {
        return new Response(null, { status: 404 });
    }
}