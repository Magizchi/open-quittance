<script lang="ts">
	import Table from '$lib/components/organisms/table.svelte';
	export let data;

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
		}
	];
</script>

<section class="flex flex-col p-5">
	<h1>Location en cours</h1>
	<Table {columns} rows={data.rentals} let:row>
		<tr>
			<td class="px-5 py-3">
				<p class="flex flex-col">
					{row.landlord.companyName}
					<span class="text-xs">{row.landlord.fullName}</span>
				</p>
			</td>
			<td class="px-5 py-3">{row.tenant.fullName}</td>
			<td class="px-5 py-3">{row.property.name}</td>
			<td class="px-5 py-3">{row.property.city}</td>
		</tr>
	</Table>
</section>
