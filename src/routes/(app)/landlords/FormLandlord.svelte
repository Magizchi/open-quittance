<script lang="ts">
	import FormForUser from '$lib/components/organisms/Forms/createUser.svelte';
	import BenIcon from '$lib/components/atoms/Icons/BenIcon.svelte';
	import Clickable from '$lib/components/atoms/Clickable.svelte';

	export let propertyForm;
	export let AddForm;
	export let removeProperty;
</script>

<form id="FormProperty" method="POST" class="space-y-10 min-w-min" action="?/create">
	<div class="px-10 space-y-5">
		<h2 class="text-2xl font-bold">Propriétaire</h2>
		<FormForUser />
	</div>
	<div class="px-10 space-y-5">
		<h3 class="text-2xl font-bold">Propriété(s)</h3>
		<div class="space-y-4">
			{#each propertyForm as form, id}
				<div class="space-y-2">
					<div class="flex justify-between">
						<h2 class="w-10/12 text-lg">{form.title} {id + 1}</h2>
						<Clickable type="button" on:click={() => removeProperty(id)}>
							<BenIcon class="w-5 text-red-600" />
						</Clickable>
					</div>
					<svelte:component this={form.component} {id} />
				</div>
			{/each}
		</div>
	</div>
</form>
<div class="flex justify-between px-10 py-3">
	<Clickable type="button" on:click={AddForm}>Ajouter</Clickable>
	<Clickable form="FormProperty" type="submit">Sauvegarder</Clickable>
</div>
