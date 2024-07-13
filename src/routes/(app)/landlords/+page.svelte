<script lang="ts">
	import FormProperty from '$lib/components/organisms/Forms/createProperty.svelte';
	import Clickable from '$lib/components/atoms/Clickable.svelte';
	import { Table, Tr, Td } from '$lib/components/organisms/Table';
	import Modal from '$lib/components/atoms/Modal.svelte';
	import BuildingIcon from '$lib/components/atoms/Icons/BuildingIcon.svelte';
	import FromCreateProperties from '$lib/components/organisms/Forms/formCreateProperties.svelte';
	import FormLandlord from './FormLandlord.svelte';
	import type { PropertyModel } from '$lib/models';
	import { createNotification } from '$lib/stores/notification/store.js';
	import { columns } from './columns.js';
	export let data;

	let showLandlordForm = false;
	let showAddPropertyForm = false;

	export let form;
	$: if (form) createNotification(form);
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
		return (propertyForm = propertyForm.filter((_item, index) => index != id));
	};

	let landlord = {} as PropertyModel;

	const AddPropertyToOneLandlord = (row: any) => {
		showAddPropertyForm = true;
		landlord = row;
	};
</script>

<section class="px-10 space-y-3">
	<div class="flex">
		<div class="w-11/12">
			<h1 class="text-2xl font-bold">Liste des Propriétaires</h1>
		</div>
		<div class="w-1/12">
			<Clickable on:click={() => (showLandlordForm = true)}>Ajouter</Clickable>
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
				<Clickable on:click={() => AddPropertyToOneLandlord(row)}>
					<BuildingIcon class="w-5" />
				</Clickable>
			</Td>
		</Tr>
	</Table>
</section>
<Modal bind:showModal={showLandlordForm}>
	<FormLandlord {AddForm} {propertyForm} {removeProperty} />
</Modal>
<Modal bind:showModal={showAddPropertyForm}>
	<FromCreateProperties {AddForm} {landlord} {propertyForm} {removeProperty} />
</Modal>
