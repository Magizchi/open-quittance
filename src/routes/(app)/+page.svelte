<script lang="ts">
	import { saveAs } from 'file-saver';
	import dayjs from 'dayjs';
	import 'dayjs/locale/fr';
	dayjs.locale('fr');

	import { PdfIcon, PenIcon } from '$lib/components/atoms/Icons/icon.js';
	import { Table, Tr, Td } from '$lib/components/organisms/Table';
	import Modal from '$lib/components/atoms/Modal.svelte';
	import Clickable from '$lib/components/atoms/Clickable.svelte';

	export let data;

	let pdfBuffer: any;
	let showModalPaymentDate: boolean = false;
	let loading: boolean = false;
	let selectedReceipts: {
		tenant_fullName: string;
		landlord_fullName: string;
		startDate: string;
		id: number | string;
	} = {
		tenant_fullName: '',
		landlord_fullName: '',
		startDate: '',
		id: ''
	};

	let documentName: string;
	async function getPdf(receiptId: number) {
		const response = await fetch(`/api/generate-pdf?receiptId=${receiptId}`)
			.then((res) => {
				const getDocumentName = res.headers.get('document-name');
				if (getDocumentName) {
					documentName = getDocumentName;
				}
				return res;
			})
			.then((data) => data.blob());

		pdfBuffer = response;

		const blob = new Blob([pdfBuffer], { type: 'application/pdf' });

		saveAs(blob, `quittance-${documentName}.pdf`);
	}

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
			header: 'Adresse du local',
			dataIndex: 'address'
		},
		{
			header: 'Statut',
			dataIndex: 'startDate'
		},
		{
			header: 'Date de paiement',
			dataIndex: 'paymentDate'
		},
		{
			header: 'Total',
			dataIndex: 'total'
		},

		{
			header: 'Option',
			dataIndex: ''
		}
	];
</script>

<section class="relative px-10 space-y-3 bg-slate-100">
	<h1 class="text-2xl font-bold">Tableau de bord</h1>
	<Table {columns} rows={data.receiptList} let:row>
		<Tr>
			{#if typeof row === 'string'}
				<td colspan={columns.length} class="font-bold text-gray-600 bg-gray-300">{row}</td>
			{:else}
				<Td>
					<p class="flex flex-col">
						{row.landlord_fullName}
					</p>
				</Td>
				<Td>{row.tenant_fullName}</Td>
				<Td>
					<p class="flex flex-col">
						{row.property_address}
						<span class="flex space-x-2">
							{row.property_city}
							{row.property_postalCode}
						</span>
					</p>
				</Td>
				<Td>
					{#if row.paymentDate}
						<p class="font-bold text-green-400">Payé</p>
					{:else}
						<p>Brouillon</p>
					{/if}
				</Td>
				<Td>
					{#if row.paymentDate}
						<p>{dayjs(row.paymentDate).format('DD/MM/YYYY')}</p>
					{:else}
						<p>/</p>
					{/if}
				</Td>
				<Td>
					{row.rent + row.condo_fees + row.taxes}
				</Td>
				<Td>
					<div class="flex items-center space-x-5">
						<button
							class="flex items-center space-x-2 hover:scale-110 hover:transition-all hover:duration-300"
							on:click={() => {
								loading = true;
								getPdf(row.id);
							}}
						>
							<PdfIcon width="25" /> PDF
						</button>
						{#if !row.paymentDate}
							<button
								class="text-green-400"
								on:click={() => {
									showModalPaymentDate = true;
									selectedReceipts = row;
								}}
							>
								<div
									class="flex items-center space-x-2 hover:scale-110 hover:transition-all hover:duration-300"
								>
									<PenIcon width="25" />
									A valider
								</div>
							</button>
						{/if}
					</div>
				</Td>
			{/if}
		</Tr>
	</Table>
</section>

<Modal bind:showModal={showModalPaymentDate}>
	<form id="AddPaymentDate" method="POST" action="?/paymentDate">
		<div class="px-10 space-y-5">
			<h3 class="text-2xl font-bold text-slate-700">Confirmer le paiement</h3>
			<p class="underline">Le locataire :</p>
			<span class="font-bold">{selectedReceipts.tenant_fullName}</span>
			<p class="underline">Le Bailleur :</p>
			<span class="font-bold">{selectedReceipts.landlord_fullName}</span>
			<p class="underline">Periode de :</p>
			<span class="font-bold"
				>{dayjs(selectedReceipts.startDate).locale('fr').format('MMMM').toUpperCase()}</span
			>
			<p>
				Veuillez saisir la date de paiement de <span class="underline"
					>{selectedReceipts.tenant_fullName}</span
				>
			</p>
			<input name="receiptID" value={selectedReceipts.id} hidden />
			<input name="paymentDate" type="date" />
			<label for="checkbox" class="flex items-center justify-start">
				<input id="checkbox" class="mr-2" name="changeCreateDate" type="checkbox" checked />
				Modifier la date de création de la quittance
			</label>
		</div>
	</form>
	<div class="flex justify-end px-10 py-3">
		<Clickable form="AddPaymentDate" type="submit">Sauvegarder</Clickable>
	</div>
</Modal>
