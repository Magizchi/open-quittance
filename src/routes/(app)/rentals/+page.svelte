<script lang="ts">
	import Modal from '$lib/components/atoms/Modal.svelte';
	import FormRental from '$lib/components/organisms/Forms/createRental.svelte';
	import Clickable from '$lib/components/atoms/Clickable.svelte';
	import { Table, Tr, Td } from '$lib/components/organisms/Table';
	import dayjs from 'dayjs';
	import Input from '$lib/components/atoms/Input.svelte';
	import type RentalModel from '$lib/models/rental.model.js';

	export let data;
	let showModal = false;
	let showModalEndRentals = false;
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
		},
		{
			header: 'Début de location',
			dataIndex: 'startDate'
		},
		{
			header: 'Fin de location',
			dataIndex: 'endDate'
		},
		{
			header: 'Options',
			dataIndex: 'options'
		}
	];

	let rental = {} as RentalModel;
</script>

<section class="px-10 space-y-3">
	<div class="flex">
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
			<Td>{dayjs(row.startDate).format('DD/MM/YYYY')}</Td>
			<Td>{row.endDate ? dayjs(row.endDate).format('DD/MM/YYYY') : '/'}</Td>
			<Td>
				<div>
					<Clickable
						disabled={row.endDate ? true : false}
						on:click={() => {
							showModalEndRentals = true;
							rental = row;
						}}>Fin de location</Clickable
					>
				</div>
			</Td>
		</Tr>
	</Table>
</section>
<Modal bind:showModal>
	<form method="POST" class="px-10 space-y-10" action="?/create">
		<h2 class="text-2xl font-bold">Location</h2>
		<FormRental properties={data.propertiesOptions} tenants={data.tenantsOptions} />
		<div class="flex justify-end">
			<Clickable type="submit">Sauvegarder</Clickable>
		</div>
	</form>
</Modal>
<Modal bind:showModal={showModalEndRentals}>
	<form method="POST" class="px-10 space-y-5" action="?/delete">
		<h2 class="text-2xl font-bold">Fin de location</h2>
		<div class="space-y-3">
			<p class="font-bold">Bailleur : <span class="font-normal">{rental.landlords?.name}</span></p>
			<p class="font-bold">Locataire : <span class="font-normal">{rental.tenants?.name}</span></p>
			<p class="font-bold">
				Propriété : <span class="font-normal"
					>{rental.properties?.name} - {rental.properties?.city}</span
				>
			</p>
			<Input name="endDate" type="date" />
			<Input name="rentalId" value={rental.rentalId} type="hidden" />
		</div>
		<div class="flex justify-end">
			<Clickable>Valider</Clickable>
		</div>
	</form>
</Modal>
