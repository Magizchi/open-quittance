<script>
	let date = 'Février 2022';
	let infos = {
		tenant: {
			name: 'GANAPATHY',
			city: 'Bobigny',
			postalCode: '93000',
			address: '1 avenue edouard vaillant'
		},
		owner: {
			name: 'SCI GANESHA',
			address: '1 avenue edouard vaillant',
			postalCode: '93000',
			city: 'Bobigny'
		},
		receipt: {
			rent: 900,
			charge: 50,
			paymentDate: new Date().toLocaleDateString(),
			does: new Date().toLocaleDateString(),
			startDate: '01/02/2023',
			endDate: '01/03/2023'
		}
	};
	// Create our number formatter.
	let euro = Intl.NumberFormat('fr-FR', {
		style: 'currency',
		currency: 'EUR'
	});
</script>

<page class="flex justify-center">
	<section class="page">
		<h1 class="flex justify-center text-xl mb-5">QUITTANCE DE LOYER</h1>
		<div>
			<b>Propriétaire</b>
			<p>{infos.owner.name}</p>
			<p>{infos.owner.address}</p>
			<p>{infos.owner.city} {infos.owner.postalCode}</p>
		</div>
		<div class="flex justify-end mb-5">
			<div>
				<b>Locataire</b>
				<p>{infos.tenant.name}</p>
				<p>{infos.tenant.address}</p>
				<p>{infos.tenant.city} {infos.tenant.postalCode}</p>
			</div>
		</div>

		<p class="mb-10">Quittance de loyer du mois de {date}</p>
		<p class="mb-5 underline">Adresse de location :</p>

		<p class="flex justify-center mb-5">
			{infos.tenant.address}
			{infos.tenant.city}
			{infos.tenant.postalCode}
		</p>

		<p class="mb-10 text-justify">
			Reçus de {infos.tenant.name} la somme de <b>950 euros, neuf cent cinquante euros</b>, au titre
			du paiement du loyer et des charges du local sis
			<b>{infos.tenant.address} {infos.tenant.city} {infos.tenant.postalCode}</b>
			pour la période de location du {infos.receipt.startDate} au {infos.receipt.endDate} et lui en donne
			quittance, sous réserve de tous mes droits.
		</p>

		<p class="underline mb-5">Détail du règlement :</p>
		<p class="">Loyer : {euro.format(infos.receipt.rent)}</p>
		<p class="">Provision de charger : {euro.format(infos.receipt.charge)}</p>
		<p class="">TOTAL : {euro.format(infos.receipt.rent + infos.receipt.charge)}</p>
		<p class="mb-5">Date de Paiment : {infos.receipt.paymentDate}</p>

		<p>Fait à Bobigny le</p>

		<p>Signature</p>
	</section>
</page>

<style>
	.page {
		width: 21cm;
		min-height: 27.7cm;
		padding: 2cm;
		margin: 1cm auto;
		/* border: 1px #d3d3d3 solid; */
		/* border-radius: 5px; */
		background: white;
		/* box-shadow: 0 0 5px rgba(0, 0, 0, 0.1); */
	}

	@page {
		size: A4;
		margin: 0;
		padding: 0;
	}
</style>
