import TenantModel from '$lib/models/tenants.model';
import { GetTenants } from '$lib/utils/service/tenants/index.js';

export async function GET({ url }) {
    try {
        const page = url.searchParams.get('page');
        const show = url.searchParams.get('show');

        if (page === '' || page === null || show === '' || show === null) {
            return new Response(null, { status: 404 });
        }
        const tenantsList: TenantModel[] = await GetTenants(+page, +show);

        return new Response(JSON.stringify(tenantsList), { status: 200 });
    } catch (err) {
        return new Response(null, { status: 404 });
    }
}