<script lang="ts">
	import { saveAs } from 'file-saver';
	import Table from '$lib/components/organisms/table.svelte';
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
			header: 'Ville',
			dataIndex: 'city'
		},
		{
			header: 'Date de création',
			dataIndex: 'startDate'
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
				<td class="px-5 py-3">{row.property_city}</td>
				<td class="px-5 py-3">{dayjs(row.createAt).format('DD/MM/YYYY')}</td>
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
