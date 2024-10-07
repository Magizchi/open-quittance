<script lang="ts">
	import { Routes } from '$lib/constants/routes.js';
	import Clickable from '$lib/components/atoms/Clickable.svelte';
	import { Table, Tr, Td } from '$lib/components/organisms/Table';

	export let data;

	const columns = [
		{
			header: 'Locataire',
			dataIndex: 'name'
		},
		{
			header: 'Siret',
			dataIndex: 'siret'
		},
		{
			header: 'Adresse',
			dataIndex: 'address'
		},
		{
			header: 'Ville',
			dataIndex: 'city'
		},
		{
			header: 'Code Postal',
			dataIndex: 'postalCode'
		}
	];
</script>

<section class="px-10 space-y-3">
	<div class="flex justify-between">
		<h1 class="text-2xl font-bold font-hind text-slate-700">Locataires</h1>
		<Clickable primary href={Routes.createTenant}>Ajouter</Clickable>
	</div>
	<Table {columns} rows={data.tenants} let:row>
		<Tr>
			<Td>
				<a href={Routes.tenants + '/' + row.id} class="underline">
					{row.name}
				</a>
			</Td>
			<Td>
				{row.siret}
			</Td>
			<Td>
				{row.address}
			</Td>
			<Td>
				{row.city}
			</Td>
			<Td>
				{row.postalCode}
			</Td>
		</Tr>
	</Table>
</section>
