<script>
	import Table from '../../../components/table/+page.svelte';
	const columns = [
		{
			title: 'Bailleur',
			dataIndex: 'bailleur'
		},
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
			title: 'Dernier mois payé',
			dataIndex: 'lastMounth'
		}
	];

	const infos = [
		{
			bailleur: 'SCI',
			name: 'JEAN',
			status: 'SARL',
			city: 'BOIBIGNY',
			lastMounth: 1
		},
		{
			bailleur: 'SCI',
			name: 'JEAN',
			status: 'SARL',
			city: 'BOIBIGNY',
			lastMounth: 1
		},
		{
			bailleur: 'SCI',
			name: 'JEAN',
			status: 'SARL',
			city: 'BOIBIGNY',
			lastMounth: 1
		}
	];
</script>

<Table {columns} {infos} />
