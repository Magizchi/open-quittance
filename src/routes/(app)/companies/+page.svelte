<script>
	import Table from '$lib/components/table/+page.svelte';
	export let data;
	console.log('data', data.owners);
	const columns = [
		{
			title: 'Nom',
			dataIndex: 'companyName'
		},
		{
			title: 'Statut',
			dataIndex: 'status'
		},
		{
			title: 'Adresse',
			dataIndex: 'address'
		},
		{
			title: 'Ville',
			dataIndex: 'city'
		},
		{
			title: 'Code Postal',
			dataIndex: 'postalCode'
		}
	];
</script>

<Table {columns} infos={data.owners} />
