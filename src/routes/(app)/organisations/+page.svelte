<script>
	import FormUser from '$lib/components/organisms/Forms/createUser.svelte';
	import Clickable from '$lib/components/atoms/Clickable.svelte';
	import { browser } from '$app/environment';

	import { goto } from '$app/navigation';
	export let form;
	// $: if (form && browser) {
	// 	// window.location.href = '/';
	// 	goto('/');
	// }
</script>

<section class="flex justify-center p-5">
	<form id="FormProperty" method="POST" class="w-1/2 space-y-10" action="?/create">
		<div class="p-10 space-y-5 rounded-2xl">
			<div class="space-y-1">
				<h2 class="text-2xl font-bold">Propriétaire</h2>
				<p>Les informations ci-dessous seront nécessaires pour la génération des quittances</p>
			</div>

			<FormUser />
		</div>
		<div class="flex justify-end px-10">
			<Clickable type="submit">Ajouter</Clickable>
		</div>
	</form>
</section>
