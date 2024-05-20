<script>
	import Table from '$lib/components/organisms/table.svelte';
	import Modal from '$lib/components/atoms/Modal.svelte';
	import FormForUser from '$lib/components/organisms/Forms/createUser.svelte';
	import Clickable from '$lib/components/atoms/Clickable.svelte';

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

<section>
	<div class="flex py-10 m-5">
		<div class="w-11/12">
			<h1>Locataires</h1>
		</div>
		<div class="w-1/12">
			<Clickable on:click={() => (showModal = true)}>Ajouter</Clickable>
		</div>
	</div>
	<Table {columns} rows={data.tenants} let:row>
		<tr>
			<td class="px-5 py-3">
				{row.name}
			</td>
			<td class="px-5 py-3">
				{row.siret}
			</td>
			<td class="px-5 py-3">
				{row.address}
			</td>
			<td class="px-5 py-3">
				{row.city}
			</td>
			<td class="px-5 py-3">
				{row.postalCode}
			</td>
		</tr>
	</Table>

	<Modal bind:showModal>
		<form method="POST" class="space-y-10" action="?/create">
			<FormForUser />
			<button type="submit">submit</button>
		</form>
	</Modal>
</section>
