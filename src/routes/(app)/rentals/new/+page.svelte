<script>
	import Clickable from '$lib/components/atoms/Clickable.svelte';
	import { Routes } from '$lib/constants/routes';
	import FormRental from '$lib/components/organisms/Forms/createRental.svelte';

	export let data;
</script>

<section class="flex items-center justify-center w-full mt-10">
	<div class="flex flex-col max-w-xl bg-white shadow-lg rounded-xl">
		<div class="p-5 space-y-5 bg-indigo-500 rounded-t-xl">
			<h2 class="text-3xl text-white font-hind">Création d'une location</h2>
			<p class="text-base text-white font-hind">
				Les informations ci-dessous seront nécessaires pour la génération des quittances.
			</p>
		</div>
		<div class="p-5">
			<form id="landlord" method="POST" class="space-y-5">
				<FormRental properties={data.propertiesOptions} tenants={data.tenantsOptions} />
				<div class="flex space-x-5">
					<Clickable secondary likeButton href={Routes.rentals}>Annuler</Clickable>
					<Clickable primary type="submit">Ajouter</Clickable>
				</div>
			</form>
		</div>
	</div>
</section>
