<script>
	import Table from '$lib/components/organisms/table.svelte';
	export let data;
	const columns = [
		{
			header: 'Propriétaire',
			dataIndex: 'landlord_fullName'
		},
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
			header: 'Charge copropriété',
			dataIndex: 'condo_fees'
		},
		{
			header: 'Taxes',
			dataIndex: 'taxes'
		}
	];
</script>

<Table {columns} rows={data.properties} let:row>
	<tr>
		<td class="px-5 py-3">
			{row.landlord}
		</td>
		<td class="px-5 py-3">
			{row.name}
		</td>
		<td class="px-5 py-3">
			{`${row.address} ${row.city} ${row.postalCode}`}
		</td>
		<td class="px-5 py-3">
			{row.rent}
		</td>
		<td class="px-5 py-3">
			{row.condoFees}
		</td>
		<td class="px-5 py-3">
			{row.taxes}
		</td>
	</tr>
</Table>
