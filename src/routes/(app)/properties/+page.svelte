<script lang="ts">
	import Clickable from '$lib/components/atoms/Clickable.svelte';
	import { Table, Tr, Td } from '$lib/components/organisms/Table';
	import { Routes } from '$lib/constants/routes.js';
	import EditIcon from '$lib/components/atoms/Icons/EditIcon.svelte';

	export let data;

	export const columns = [
		{
			header: 'Adresse',
			dataIndex: 'address'
		},
		{
			header: 'Description',
			dataIndex: 'name'
		},
		{
			header: 'Loyer',
			dataIndex: 'rent'
		},
		{
			header: 'Charges',
			dataIndex: 'condo_fees'
		},
		{
			header: 'Taxe',
			dataIndex: 'taxes'
		},
		{
			header: '',
			dataIndex: ''
		}
	];
</script>

<section class="px-10 space-y-3">
	<div class="flex justify-between">
		<h1 class="text-2xl font-bold font-hind text-slate-700">Liste des Propriétés</h1>
		<Clickable variant="primary" href={Routes.createProperty}>Créer une propriété</Clickable>
	</div>
	<Table {columns} rows={data.properties} let:row>
		<Tr>
			<Td>
				<div class="flex flex-col items-end text-justify">
					{row.address}
					<span class="flex space-x-3">
						{row.city}
						{row.postalCode}
					</span>
				</div>
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
