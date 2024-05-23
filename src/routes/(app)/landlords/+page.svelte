<script lang="ts">
	import FormForUser from '$lib/components/organisms/Forms/createUser.svelte';
	import FormProperty from '$lib/components/organisms/Forms/createProperty.svelte';
	import Clickable from '$lib/components/atoms/Clickable.svelte';
	import { Table, Tr, Td } from '$lib/components/organisms/Table';
	import Modal from '$lib/components/atoms/Modal.svelte';

	export let data;
	export let form;

	let showModal = false;
	let propertyForm = [{ title: 'Propriété 1', component: FormProperty }];

	const AddForm = () => {
		return (propertyForm = [
			...propertyForm,
			{
				title: `Propriété ${propertyForm.length + 1}`,
				component: FormProperty
			}
		]);
	};

	const columns = [
		{
			header: 'Propriétaire',
			dataIndex: 'name'
		},
		{
			header: 'Siret',
			dataIndex: 'siret'
		},
		{
			header: 'Nom',
			dataIndex: 'fullName'
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
		},
		{
			header: 'Options',
			dataIndex: 'options'
		}
	];
</script>

<section class="px-10">
	<div class="flex py-10 m-5">
		<div class="w-11/12">
			<h1>Propriétaire</h1>
		</div>
		<div class="w-1/12">
			<Clickable on:click={() => (showModal = true)}>Ajouter</Clickable>
		</div>
	</div>
	<Table {columns} rows={data.landlords} let:row let:id>
		<Tr>
			<Td>
				<a href={'/landlords/' + row.id}>
					{row.name}
				</a>
			</Td>
			<Td>
				{row.siret}
			</Td>
			<Td>
				{row.fullName}
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
				<a href="/">Ajouter propriété</a>
			</Td>
		</Tr>
	</Table>
	<Modal bind:showModal>
		<form method="POST" class="space-y-10" action="?/create">
			<div>
				<FormForUser />
			</div>
			<div class="space-y-5">
				{#each propertyForm as form, id}
					<div class="space-y-2">
						<h2>{form.title}</h2>
						<svelte:component this={form.component} {id} />
					</div>
				{/each}
			</div>
			<button type="submit">submit</button>
		</form>
		<button type="button" on:click={AddForm}>+</button>
	</Modal>
</section>
