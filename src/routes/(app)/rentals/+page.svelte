<script lang="ts">
	import Modal from '$lib/components/atoms/Modal.svelte';
	import Clickable from '$lib/components/atoms/Clickable.svelte';
	import { Table, Tr, Td } from '$lib/components/organisms/Table';
	import type { RentalModel } from '$lib/models';
	import { ROUTES } from '$lib/constants/routes.js';
	import { formatDate } from '$lib/utils/date.js';
	import EndRentals from './endRentals.svelte';

	export let data;

	export const columns = [
		{
			header: 'Locataire',
			dataIndex: 'tenant'
		},
		{
			header: 'Propriété',
			dataIndex: 'property'
		},
		{
			header: 'Description propriété ',
			dataIndex: 'name'
		},
		{
			header: 'Début de location',
			dataIndex: 'startDate'
		},
		{
			header: '',
			dataIndex: 'options'
		}
	];

	let showModalEndRentals = false;
	let selectedRental = {} as RentalModel;

	function changeModal() {
		return (showModalEndRentals = false);
	}
</script>

<section class="px-10 space-y-3">
	<div class="flex justify-between">
		<h1 class="text-2xl font-bold font-hind text-slate-700">Liste des Locations en cours</h1>
		<Clickable variant="primary" href={ROUTES.createRental}>Ajouter</Clickable>
	</div>
	<Table {columns} rows={data.rentals} let:row>
		<Tr>
			<Td>{row.tenants.name}</Td>
			<Td>
				<div class="flex flex-col items-end text-justify">
					{row.properties.address}
					<span class="flex space-x-3">
						{row.properties.city}
						{row.properties.postalCode}
					</span>
				</div>
			</Td>
			<Td>{row.properties.name}</Td>
			<Td>{formatDate(row.rentals.startedAt)}</Td>
			<Td>
				<div class="flex justify-end">
					<div class="w-1/2">
						<Clickable
							variant="border"
							on:click={() => {
								showModalEndRentals = true;
								selectedRental = row;
							}}>Fin de location</Clickable
						>
					</div>
				</div>
			</Td>
		</Tr>
	</Table>
</section>

<Modal bind:showModal={showModalEndRentals}>
	<form method="POST" action="?/delete">
		<EndRentals {selectedRental} />
		<div class="flex justify-end px-10 py-3">
			<div class="flex space-x-5">
				<Clickable secondary type="button" on:click={changeModal}>Annuler</Clickable>
				<Clickable primary type="submit">Valider</Clickable>
			</div>
		</div>
	</form>
</Modal>
