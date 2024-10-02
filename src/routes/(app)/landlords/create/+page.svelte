<script lang="ts">
	import Register from '$lib/components/organisms/Forms/register.svelte';
</script>

<form id="FormProperty" method="POST" class="m-2 space-y-10 min-w-min">
	<div class="w-1/4 px-10 space-y-4">
		<h2 class="text-2xl font-bold">Bailleur</h2>
		<Register />
	</div>
</form>
<!-- <div class="flex justify-between px-10 py-3 w-96">
	<Clickable type="button" on:click={AddForm}>Ajouter</Clickable>
	<Clickable form="FormProperty" type="submit">Sauvegarder</Clickable>
</div> -->
