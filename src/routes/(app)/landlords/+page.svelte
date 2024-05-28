<script lang="ts">
	import FormForUser from '$lib/components/organisms/Forms/createUser.svelte';
	import FormProperty from '$lib/components/organisms/Forms/createProperty.svelte';
	import Clickable from '$lib/components/atoms/Clickable.svelte';
	import { Table, Tr, Td } from '$lib/components/organisms/Table';
	import Modal from '$lib/components/atoms/Modal.svelte';
	import BenIcon from '$lib/components/atoms/Icons/BenIcon.svelte';
	import BuildingIcon from '$lib/components/atoms/Icons/BuildingIcon.svelte';

	export let data;

	let showModal = false;
	let propertyForm = [{ id: 1, title: 'Propriété', component: FormProperty }];

	const AddForm = () => {
		return (propertyForm = [
			...propertyForm,
			{
				id: propertyForm.length + 1,
				title: 'Propriété',
				component: FormProperty
			}
		]);
	};

	const removeProperty = (id: number) => {
		return (propertyForm = propertyForm.filter((item, index) => index != id));
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
			header: 'Nombre de propriété',
			dataIndex: 'properties'
		},
		{
			header: 'Options',
			dataIndex: 'options'
		}
	];
</script>

<section class="px-10">
	<div class="flex mx-5">
		<div class="w-11/12">
			<h1 class="text-2xl font-bold">Liste des Propriétaires</h1>
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
				{row.address}
			</Td>
			<Td>
				{row.city}
			</Td>
			<Td>
				{row.postalCode}
			</Td>
			<Td>
				{row.properties}
			</Td>
			<Td>
				<Clickable><BuildingIcon class="w-5" /></Clickable>
			</Td>
		</Tr>
	</Table>
	<Modal bind:showModal class="p-5 shadow-md rounded-2xl shadow-black scroll-m-10">
		<form id="FormProperty" method="POST" class="space-y-10 min-w-min" action="?/create">
			<div class="px-10 space-y-5">
				<h2 class="text-2xl font-bold">Propriétaire</h2>
				<FormForUser />
			</div>
			<div class="px-10 space-y-5">
				<h3 class="text-2xl font-bold">Propriété(s)</h3>
				<div class="space-y-4">
					{#each propertyForm as form, id}
						<div class="space-y-2">
							<div class="flex justify-between">
								<h2 class="w-10/12 text-lg">{form.title} {id + 1}</h2>
								<Clickable type="button" on:click={() => removeProperty(id)}>
									<BenIcon class="w-5 text-red-600" />
								</Clickable>
							</div>
							<svelte:component this={form.component} {id} />
						</div>
					{/each}
				</div>
			</div>
		</form>
		<div class="flex justify-between px-10 py-3">
			<Clickable type="button" on:click={AddForm}>Ajouter</Clickable>
			<Clickable form="FormProperty" type="submit">Sauvegarder</Clickable>
		</div>
	</Modal>
</section>
