<script>
	import Table from '../../../components/table/+page.svelte';
	const columns = [
		{
			title: 'Nom',
			dataIndex: 'name'
		},
		{
			title: 'Statut',
			dataIndex: 'status'
		},
		{
			title: 'Ville',
			dataIndex: 'city'
		},
		{
			title: 'Nombre de locataire',
			dataIndex: 'nbLocataire'
		}
	];

	const infos = [
		{
			name: 'SCI GANESHA',
			status: 'SCI',
			city: 'DRANCY',
			nbLocataire: 1
		},
		{
			name: 'SCI GANESHA',
			status: 'SCI',
			city: 'DRANCY',
			nbLocataire: 1
		},
		{
			name: 'SCI GANESHA',
			status: 'SCI',
			city: 'DRANCY',
			nbLocataire: 1
		}
	];
</script>

<Table {columns} {infos} />
