<script lang="ts">
	import Modal from '$lib/components/atoms/Modal.svelte';
	import FormRental from '$lib/components/organisms/Forms/createRental.svelte';
	import Clickable from '$lib/components/atoms/Clickable.svelte';
	import { Table, Tr, Td } from '$lib/components/organisms/Table';
	import Input from '$lib/components/atoms/Input.svelte';
	import type RentalModel from '$lib/models/rental.model.js';
	import { columns } from './columns';
	import { Routes } from '$lib/constants/routes.js';
	import { formatDate } from '$lib/utils/date/index.js';
	export let data;
	let showModal = false;
	let showModalEndRentals = false;

	let rental = {} as RentalModel;
</script>

<section class="px-10 space-y-3">
	<div class="flex justify-between">
		<h1 class="text-2xl font-bold font-hind text-slate-700">Liste des Locations en cours</h1>
		<Clickable primary href={Routes.createRental}>Ajouter</Clickable>
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
			<Td>{formatDate(row.startDate)}</Td>
			<Td>{row.endDate ? formatDate(row.endDate) : '/'}</Td>
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
