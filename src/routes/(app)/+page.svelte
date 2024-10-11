<script lang="ts">
	import { landlordsColumns } from '$lib/components/features/landing/landlords_columns.js';
	import { saveAs } from 'file-saver';
	import { formatDate, getMonth } from '$lib/utils/date';
	import { PdfIcon } from '$lib/components/atoms/Icons/icon.js';
	import { Table, Tr, Td } from '$lib/components/organisms/Table';
	import Modal from '$lib/components/atoms/Modal.svelte';
	import Clickable from '$lib/components/atoms/Clickable.svelte';
	import ValideReceipt from '$lib/components/organisms/Forms/valideReceipt.svelte';
	import Pins from '$lib/components/atoms/Pins.svelte';

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

	async function filterPage(page: number = 1, show: number = 12) {
		const response = await fetch(`/api/landing?page=${page}&show=${show}`).then((data) =>
			data.json()
		);
		data.receiptList = response;
	}
</script>

<section class="relative px-10 space-y-5 bg-slate-100">
	<h1 class="text-2xl font-bold font-hind text-slate-700">Tableau de bord</h1>

	<Table scalpe {filterPage} columns={landlordsColumns} rows={data.receiptList} let:row>
		<Tr>
			{#if typeof row === 'string'}
				<td colspan={landlordsColumns.length} class="font-bold bg-gray-300 text-slate-700 font-hind"
					>{row}</td
				>
			{:else}
				<Td>{row.tenant_fullName}</Td>
				<Td>
					<div class="flex flex-col items-end text-justify">
						{row.property_address}
						<span class="flex space-x-2">
							{row.property_city}
							{row.property_postalCode}
						</span>
					</div>
				</Td>
				<Td>
					{#if row.paymentDate}
						<Pins valide>Payé</Pins>
					{:else}
						<Pins error>Reste à payé</Pins>
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
					<div class="flex items-center justify-between w-full space-x-5">
						<Clickable
							secondary
							on:click={() => {
								loading = true;
								getPdf(row.id);
							}}
						>
							<div class="flex flex-row items-center justify-center">
								<PdfIcon class="text-base" height="20" />
								<span class="text-white font-hind">PDF</span>
							</div>
						</Clickable>
						{#if !row.paymentDate}
							<Clickable
								border
								on:click={() => {
									showModalPaymentDate = true;
									selectedReceipts = row;
								}}
							>
								Valider
							</Clickable>
						{/if}
					</div>
				</Td>
			{/if}
		</Tr>
	</Table>
</section>

<Modal bind:showModal={showModalPaymentDate}>
	<form id="AddPaymentDate" method="POST" action="?/paymentDate">
		<ValideReceipt {selectedReceipts} />
	</form>
	<div class="flex justify-end px-10 py-3">
		<Clickable primary form="AddPaymentDate" type="submit">Sauvegarder</Clickable>
	</div>
</Modal>
