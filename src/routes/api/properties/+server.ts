import { PropertyModel } from '$lib/models';
import { GetProperties } from '$lib/utils/service/properties/index.js';


export async function GET({ url }) {
    try {
        const page = url.searchParams.get('page');
        const show = url.searchParams.get('show');

        if (page === '' || page === null || show === '' || show === null) {
            return new Response(null, { status: 404 });
        }
        const propertiesList: PropertyModel[] = await GetProperties(+page, +show);

        return new Response(JSON.stringify(propertiesList), { status: 200 });
    } catch (err) {
        return new Response(null, { status: 404 });
    }
}