<script lang="ts">
	import Clickable from '$lib/components/atoms/Clickable.svelte';
	import { Table, Tr, Td } from '$lib/components/organisms/Table';
	import { columns } from './columns.js';
	import { Routes } from '$lib/constants/routes.js';

	export let data;
</script>

<section class="px-10 space-y-3">
	<div class="flex justify-between">
		<h1 class="text-2xl font-bold font-hind text-slate-700">Liste des Propriété</h1>
		<Clickable primary href={Routes.createProperty}>Créer Propriétaire</Clickable>
	</div>
	<Table {columns} rows={data.properties} let:row>
		<Tr>
			<Td>
				<a href={Routes.properties + '/' + row.id} class="underline">
					{row.name}
				</a>
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
			<Td>
				{row.rent}
			</Td>
			<Td>
				{row.condo_fees}
			</Td>
			<Td>
				{row.taxes}
			</Td>
		</Tr>
	</Table>
</section>
