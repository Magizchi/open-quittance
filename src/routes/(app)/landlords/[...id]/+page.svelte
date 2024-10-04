<script lang="ts">
	import Clickable from '$lib/components/atoms/Clickable.svelte';
	import Input from '$lib/components/atoms/Input.svelte';
	import Modal from '$lib/components/atoms/Modal.svelte';
	import CreateProperty from '$lib/components/organisms/Forms/createProperty.svelte';
	import { Table, Tr, Td } from '$lib/components/organisms/Table';
	import type { PropertyModel } from '$lib/models';
	import FormProperty from '$lib/components/organisms/Forms/createProperty.svelte';
	import FromCreateProperties from '$lib/components/organisms/Forms/formCreateProperties.svelte';
	import dayjs from 'dayjs';
	import { createNotification } from '$lib/stores/notification/store.js';

	export let data;
	export let form;

	$: if (form) createNotification(form);

	let showModal = false;
	let property: PropertyModel;

	let showAddPropertyForm = false;
	let propertyForm = [{ id: 1, title: 'Propriété', component: FormProperty }];

	const removeProperty = (id: number) => {
		return (propertyForm = propertyForm.filter((item, index) => index != id));
	};

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

	const deleteProperty = async (id: number) => {
		const response = await fetch(`/api/properties/${id}`, {
			method: 'DELETE'
		}).then((data) => data.json());
		data.properties = data.properties.filter((item) => item.id !== id);
		createNotification(response);
	};
	const columnsProperty = [
		{
			header: 'Nom',
			dataIndex: 'name'
		},
		{
			header: 'Adresse',
			dataIndex: 'address'
		},
		{
			header: 'Loyer',
			dataIndex: 'rent'
		},
		{
			header: 'Charge',
			dataIndex: 'condo_fees'
		},
		{
			header: 'Taxes',
			dataIndex: 'taxes'
		},
		{
			header: 'Options',
			dataIndex: 'options'
		}
	];
	const columnsRentals = [
		{
			header: 'Propriété',
			dataIndex: 'name'
		},
		{
			header: 'Locataire',
			dataIndex: 'tenants'
		},
		{
			header: 'Début de la location',
			dataIndex: 'startDate'
		}
	];
</script>

<section class="px-10 space-y-10">
	<div>
		<h1 class="text-2xl">{data.landlord.name}</h1>
		<span class="text-slate-400">{data.landlord.siret}</span><br />
	</div>

	<div class="space-y-3">
		<div class="flex justify-between">
			<h2 class="text-xl">Propriété(s)</h2>
			<Clickable on:click={() => (showAddPropertyForm = true)}>Ajouter</Clickable>
		</div>
		<Table columns={columnsProperty} rows={data.properties} let:row>
			<Tr>
				<Td>
					{row.name}
				</Td>
				<Td>
					<p class="flex flex-col">
						{row.address}
						<span class="flex space-x-2">
							{row.city}
							{row.postalCode}
						</span>
					</p>
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
					<div class="flex space-x-5">
						<Clickable
							on:click={() => {
								showModal = true;
								property = row;
							}}>MODIFIER</Clickable
						>
						<Clickable on:click={() => deleteProperty(row.id)}>SUPPRIMER</Clickable>
					</div>
				</Td>
			</Tr>
		</Table>
	</div>
	<div class="space-y-3">
		<div class="flex justify-between">
			<h2 class="text-xl">Location en cours</h2>
			<Clickable>Créer</Clickable>
		</div>
		<Table columns={columnsRentals} rows={data.rentals} let:row>
			<Tr>
				<Td>
					<div>
						{row.properties.name}
						{row.properties.address}
					</div>
				</Td>
				<Td>
					{row.tenants.name}
				</Td>
				<Td>
					{dayjs(row.startedAt).format('DD/MM/YYYY')}
				</Td>
			</Tr>
		</Table>
	</div>
</section>
<Modal bind:showModal>
	<form id="UpdateProperty" action="?/updateProperty" method="post">
		<div class="px-10 space-y-5">
			<h3 class="text-2xl font-bold text-slate-700">
				Modifier : <br />
				<span class="text-black">{property?.name}</span>
			</h3>
			<Input name={`properties[${0}][id]`} value={property?.id} type="hidden" />
			<CreateProperty id={0} bind:defaultValues={property} />
		</div>
	</form>
	<div class="flex justify-end py-3">
		<Clickable form="UpdateProperty" type="submit">Modifier</Clickable>
	</div>
</Modal>
<Modal bind:showModal={showAddPropertyForm}>
	<FromCreateProperties {AddForm} landlord={data.landlord} {propertyForm} {removeProperty} />
</Modal>
