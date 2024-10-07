<script lang="ts">
	import { landlordsColumns } from '$lib/components/features/landing/landlords_columns.js';
	import { saveAs } from 'file-saver';
	import { formatDate, getMonth } from '$lib/utils/date';
	import { PdfIcon } from '$lib/components/atoms/Icons/icon.js';
	import { Table, Tr, Td } from '$lib/components/organisms/Table';

	import Modal from '$lib/components/atoms/Modal.svelte';
	import Clickable from '$lib/components/atoms/Clickable.svelte';

	export let data;
	console.log('data', data);
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
</script>

<section class="relative px-10 space-y-5 bg-slate-100">
	<h1 class="text-2xl font-bold font-hind text-slate-700">Tableau de bord</h1>
	<div class="space-y-2">
		<h2 class="font-semibold font-hind text-slate-700">
			Quittance du mois {getMonth()}
		</h2>
		<Table columns={landlordsColumns} rows={data.receiptList} let:row>
			<Tr>
				{#if typeof row === 'string'}
					<td
						colspan={landlordsColumns.length}
						class="font-bold bg-gray-300 text-slate-700 font-hind">{row}</td
					>
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
							<p>{formatDate(row.paymentDate)}</p>
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
										class="flex items-center space-x-2 font-semibold hover:scale-110 hover:transition-all hover:duration-300"
									>
										Valider
									</div>
								</button>
							{/if}
						</div>
					</Td>
				{/if}
			</Tr>
		</Table>
	</div>
</section>

<!-- <Modal bind:showModal={data.openModal}>
	<form id="AddPaymentDate" method="POST" action="?/paymentDate">
		<Register />
	</form>
	<div class="flex justify-end px-10 py-3">
		<Clickable form="AddPaymentDate" type="submit">Sauvegarder</Clickable>
	</div>
</Modal> -->
