<script lang="ts">
	import FormProperty from '$lib/components/organisms/Forms/createProperty.svelte';
	import Clickable from '$lib/components/atoms/Clickable.svelte';
	import { Table, Tr, Td } from '$lib/components/organisms/Table';
	import Modal from '$lib/components/atoms/Modal.svelte';
	import BuildingIcon from '$lib/components/atoms/Icons/BuildingIcon.svelte';
	import FromCreateProperties from '$lib/components/organisms/Forms/formCreateProperties.svelte';
	import type { PropertyModel } from '$lib/models';
	import { createNotification } from '$lib/stores/notification/store.js';
	import { columns } from './columns.js';
	import { goto } from '$app/navigation';

	export let data;
</script>

<section class="px-10 space-y-3">
	<div class="flex justify-between">
		<h1 class="text-2xl font-bold">Liste des Propriété</h1>
		<!-- <Clickable href="/landlords/create" on:click={() => (showLandlordForm = true)}
			>Créer Propriétaire</Clickable
		> -->
	</div>
	<Table {columns} rows={data.properties} let:row>
		<Tr>
			<Td>
				<a href={'/landlords/' + row.id} class="underline">
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
