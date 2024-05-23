<script>
	import { Table, Tr, Td } from '$lib/components/organisms/Table';
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
	<Tr>
		<Td>
			{row.landlord}
		</Td>
		<Td>
			{row.name}
		</Td>
		<Td>
			{`${row.address} ${row.city} ${row.postalCode}`}
		</Td>
		<Td>
			{row.rent}
		</Td>
		<Td>
			{row.condoFees}
		</Td>
		<Td>
			{row.taxes}
		</Td>
	</Tr>
</Table>
