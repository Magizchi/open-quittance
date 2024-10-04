<script lang="ts">
	import FormForUser from '$lib/components/organisms/Forms/createUser.svelte';
	import Clickable from '$lib/components/atoms/Clickable.svelte';
</script>

<form id="FormProperty" method="POST" class="space-y-10 min-w-min" action="?/create">
	<div class="p-10 space-y-5 rounded-2xl">
		<h2 class="text-2xl font-bold">Propriétaire</h2>
		<FormForUser />
	</div>
</form>
<div class="flex justify-end px-10 py-3">
	<Clickable form="FormProperty" type="submit">Sauvegarder</Clickable>
</div>
