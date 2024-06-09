<script>
	import Clickable from '$lib/components/atoms/Clickable.svelte';
	import Input from '$lib/components/atoms/Input.svelte';
	import BenIcon from '$lib/components/atoms/Icons/BenIcon.svelte';
	export let landlord;
	export let propertyForm;
	export let AddForm;
	export let removeProperty;
</script>

<form id="AddProperty" method="POST" class="space-y-10 min-w-min" action="?/add">
	<div class="px-10 space-y-5">
		<h3 class="text-2xl font-bold text-slate-700">
			Ajouter une/des proriété(s) pour : <br />
			<span class="text-black">{landlord.name}</span>
		</h3>
		<div class="space-y-4">
			{#each propertyForm as form, id}
				<div class="space-y-2">
					<div class="flex justify-between">
						<h2 class="w-10/12 text-lg">{form.title} {id + 1}</h2>
						<Clickable type="button" on:click={() => removeProperty(id)}>
							<BenIcon class="w-5 text-red-600" />
						</Clickable>
					</div>
					<Input name={`properties[${id}][landlord_id]`} value={landlord.id} type="hidden" />
					<svelte:component this={form.component} {id} />
				</div>
			{/each}
		</div>
	</div>
</form>
<div class="flex justify-between px-10 py-3">
	<Clickable type="button" on:click={AddForm}>Ajouter</Clickable>
	<Clickable form="AddProperty" type="submit">Sauvegarder</Clickable>
</div>
