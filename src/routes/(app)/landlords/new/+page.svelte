<script lang="ts">
	import LandlordForm from '../landlordForm.svelte';
</script>

<section class="flex items-center justify-center w-full mt-10">
	<div class="flex flex-col max-w-xl bg-white shadow-lg rounded-xl">
		<div class="p-5 space-y-5 bg-indigo-500 rounded-t-xl">
			<h2 class="text-3xl text-white font-hind">Création du Bailleur</h2>
			<p class="text-base text-white font-hind">
				Les informations ci-dessous seront nécessaires pour la génération des quittances.
			</p>
		</div>
		<div class="pl-5">
			<form id="landlord" method="POST">
				<LandlordForm />
			</form>
		</div>
	</div>
</section>
