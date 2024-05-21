<script lang="ts">
	import { saveAs } from 'file-saver';
	import Table from '$lib/components/organisms/Table/table.svelte';
	import dayjs from 'dayjs';
	import PrintIcon from '$lib/components/atoms/Icons/PrintIcon.svelte';
	import { PenIcon } from '$lib/components/atoms/Icons/icon.js';
	export let data;
	let pdfBuffer: any;

	async function getPdf(receiptId: number) {
		const response = await fetch(`/api/generate-pdf?receiptId=${receiptId}`).then((data) =>
			data.blob()
		);
		pdfBuffer = response;

		const blob = new Blob([pdfBuffer], { type: 'application/pdf' });
		saveAs(blob, 'hello-world.pdf');
	}

	async function SetPaymentDate(receiptId: number) {
		await fetch('/api/receipts', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			},
			body: JSON.stringify({ receiptId })
		}).then((data) => data.json());

		// add modal
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
			header: 'Propriété',
			dataIndex: 'property'
		},
		{
			header: 'Adresse du local',
			dataIndex: 'address'
		},
		{
			header: 'Date de création',
			dataIndex: 'startDate'
		},
		{
			header: 'Total',
			dataIndex: 'total'
		},
		{
			header: 'Date de paiement',
			dataIndex: 'paymentDate'
		},
		{
			header: 'Option',
			dataIndex: ''
		}
	];
</script>

<section>
	<Table {columns} rows={data.receiptList} let:row>
		<tr>
			{#if typeof row === 'string'}
				<td colspan={columns.length} class="font-bold text-gray-600 bg-gray-300">{row}</td>
			{:else}
				<td class="px-5 py-3">
					<p class="flex flex-col">
						{row.landlord_fullName}
					</p>
				</td>
				<td class="px-5 py-3">{row.tenant_fullName}</td>
				<td class="px-5 py-3">{row.property_address}</td>
				<td class="px-5 py-3">
					<p class="flex flex-col">
						{row.property_address}
						<span class="flex space-x-2">
							{row.property_city}
							{row.property_postalCode}
						</span>
					</p>
				</td>
				<td class="px-5 py-3">{dayjs(row.createAt).format('DD/MM/YYYY')}</td>
				<td class="px-5 py-3">
					{row.rent + row.condo_fees + row.taxes}
				</td>
				<td class="px-5 py-3"
					>{row.paymentDate ? dayjs(row.paymentDate).format('DD/MM/YYYY') : 'not paid'}</td
				>
				<td>
					<button on:click={() => getPdf(row.id)}>
						<PrintIcon width="25" class="m-3" />
					</button>
					<button disabled={row.paymentDate ? true : false} on:click={() => SetPaymentDate(row.id)}>
						<PenIcon width="25" class="m-3" />
					</button>
				</td>
			{/if}
		</tr>
	</Table>
</section>
