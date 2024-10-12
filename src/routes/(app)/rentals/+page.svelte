<script lang="ts">
	import Modal from '$lib/components/atoms/Modal.svelte';
	import Clickable from '$lib/components/atoms/Clickable.svelte';
	import { Table, Tr, Td } from '$lib/components/organisms/Table';
	import type RentalModel from '$lib/models/rental.model.js';
	import { columns } from './columns';
	import { Routes } from '$lib/constants/routes.js';
	import { formatDate } from '$lib/utils/date/index.js';
	import EndRentals from '$lib/components/organisms/Forms/endRentals.svelte';

	export let data;
	let showModalEndRentals = false;
	let rental = {} as RentalModel;

	function changeModal() {
		return (showModalEndRentals = false);
	}
</script>

<section class="px-10 space-y-3">
	<div class="flex justify-between">
		<h1 class="text-2xl font-bold font-hind text-slate-700">Liste des Locations en cours</h1>
		<Clickable primary href={Routes.createRental}>Ajouter</Clickable>
	</div>
	<Table {columns} rows={data.rentals} let:row>
		<Tr>
			<Td>{row.tenant.name}</Td>
			<Td>
				<div class="flex flex-col items-end text-justify">
					{row.property.address}
					<span class="flex space-x-3">
						{row.property.city}
						{row.property.postalCode}
					</span>
				</div>
			</Td>
			<Td>{row.property.name}</Td>
			<Td>{formatDate(row.startDate)}</Td>
			<Td>
				<div class="flex justify-end">
					<div class="w-1/2">
						<Clickable
							border
							on:click={() => {
								showModalEndRentals = true;
								rental = row;
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
		<EndRentals {rental} />
		<div class="flex justify-end px-10 py-3">
			<div class="flex space-x-5">
				<Clickable secondary type="button" on:click={changeModal}>Annuler</Clickable>
				<Clickable primary type="submit">Valider</Clickable>
			</div>
		</div>
	</form>
</Modal>
