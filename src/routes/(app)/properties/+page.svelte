<script lang="ts">
	import Clickable from '$lib/components/atoms/Clickable.svelte';
	import { Table, Tr, Td } from '$lib/components/organisms/Table';
	import { columns } from './columns.js';
	import { Routes } from '$lib/constants/routes.js';
	import EditIcon from '$lib/components/atoms/Icons/EditIcon.svelte';

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
				{row.address}
				<span class="flex space-x-3">
					{row.city}
					{row.postalCode}
				</span>
			</Td>
			<Td>
				{row.name}
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
			<Td>
				<div class="flex items-center justify-end w-full">
					<Clickable border href={Routes.properties + '/' + row.id}>
						<div class="flex flex-row items-center justify-center">
							<EditIcon class="mr-1 text-base" height="20" /> Modifier
						</div>
					</Clickable>
				</div>
			</Td>
		</Tr>
	</Table>
</section>
