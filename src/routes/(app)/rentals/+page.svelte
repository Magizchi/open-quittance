<script lang="ts">
	import Table from '$lib/components/organisms/table.svelte';
	import Modal from '$lib/components/atoms/Modal.svelte';
	import FormRental from '$lib/components/organisms/Forms/createRental.svelte';
	import Clickable from '$lib/components/atoms/Clickable.svelte';

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

<section class="flex flex-col p-5">
	<div class="flex py-10 m-5">
		<div class="w-11/12">
			<h1>Location en cours</h1>
		</div>
		<div class="w-1/12">
			<Clickable on:click={() => (showModal = true)}>Ajouter</Clickable>
		</div>
	</div>
	<Table {columns} rows={data.rentals} let:row>
		<tr>
			<td class="px-5 py-3">
				<p class="flex flex-col">
					{row.landlord.name}
				</p>
			</td>
			<td class="px-5 py-3">{row.tenant.name}</td>
			<td class="px-5 py-3">{row.property.name}</td>
			<td class="px-5 py-3">{row.property.city}</td>
		</tr>
	</Table>
	<Modal bind:showModal>
		<form method="POST" class="space-y-10" action="?/create">
			<FormRental properties={data.propertiesOptions} tenants={data.tenantsOptions} />
			<button type="submit">submit</button>
		</form>
	</Modal>
</section>
