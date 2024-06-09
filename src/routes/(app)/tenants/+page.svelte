<script>
	import Modal from '$lib/components/atoms/Modal.svelte';
	import FormForUser from '$lib/components/organisms/Forms/createUser.svelte';
	import Clickable from '$lib/components/atoms/Clickable.svelte';
	import { Table, Tr, Td } from '$lib/components/organisms/Table';

	export let data;

	let showModal = false;

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
	<div class="flex">
		<div class="w-11/12">
			<h1 class="text-2xl font-bold">Liste des Locataires</h1>
		</div>
		<div class="w-1/12">
			<Clickable on:click={() => (showModal = true)}>Ajouter</Clickable>
		</div>
	</div>
	<Table {columns} rows={data.tenants} let:row>
		<Tr>
			<Td>
				{row.name}
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
<Modal bind:showModal>
	<form method="POST" class="px-10 space-y-10" action="?/create">
		<h2 class="text-2xl font-bold">Locataire</h2>
		<FormForUser />
		<div class="flex justify-end">
			<Clickable type="submit">Sauvegarder</Clickable>
		</div>
	</form>
</Modal>
