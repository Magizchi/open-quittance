<script>
	import Table from '$lib/components/organisms/table.svelte';
	export let data;
	const columns = [
		{
			header: 'Entreprise',
			dataIndex: 'companyName'
		},
		{
			header: 'Siret',
			dataIndex: 'siret'
		},
		{
			header: 'Nom',
			dataIndex: 'fullName'
		},
		{
			header: 'Adresse',
			dataIndex: 'address'
		},
		{
			header: 'Ville',
			dataIndex: 'city'
		},
		{
			header: 'Code Postal',
			dataIndex: 'postalCode'
		}
	];
</script>

<Table {columns} rows={data.landlords} let:row>
	<tr>
		<td class="px-5 py-3">
			{row.companyName}
		</td>
		<td class="px-5 py-3">
			{row.siret}
		</td>
		<td class="px-5 py-3">
			{row.fullName}
		</td>
		<td class="px-5 py-3">
			{row.address}
		</td>
		<td class="px-5 py-3">
			{row.city}
		</td>
		<td class="px-5 py-3">
			{row.postalCode}
		</td>
	</tr>
</Table>
