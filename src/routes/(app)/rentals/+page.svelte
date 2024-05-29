<script lang="ts">
	import Modal from '$lib/components/atoms/Modal.svelte';
	import FormRental from '$lib/components/organisms/Forms/createRental.svelte';
	import Clickable from '$lib/components/atoms/Clickable.svelte';
	import { Table, Tr, Td } from '$lib/components/organisms/Table';

	export let data;
	let showModal = false;
	const columns = [
		{
			header: 'Bailleur',
			dataIndex: 'landlord'
		},
		{
			header: 'Locataire',
			dataIndex: 'tenant'
		},
		{
			header: 'Propriété',
			dataIndex: 'property'
		},
		{
			header: 'Ville',
			dataIndex: 'city'
		}
	];
</script>

<section class="px-10">
	<div class="flex mx-5">
		<div class="w-11/12">
			<h1 class="text-2xl font-bold">Liste des Locations en cours</h1>
		</div>
		<div class="w-1/12">
			<Clickable on:click={() => (showModal = true)}>Ajouter</Clickable>
		</div>
	</div>
	<Table {columns} rows={data.rentals} let:row>
		<Tr>
			<Td>
				<p class="flex flex-col">
					{row.landlord.name}
				</p>
			</Td>
			<Td>{row.tenant.name}</Td>
			<Td>{row.property.name}</Td>
			<Td>{row.property.city}</Td>
		</Tr>
	</Table>
	<Modal bind:showModal class="p-5 shadow-md rounded-2xl shadow-black scroll-m-10">
		<form method="POST" class="px-10 space-y-10" action="?/create">
			<h2 class="text-2xl font-bold">Location</h2>
			<FormRental properties={data.propertiesOptions} tenants={data.tenantsOptions} />
			<div class="flex justify-end">
				<Clickable type="submit">Sauvegarder</Clickable>
			</div>
		</form>
	</Modal>
</section>
