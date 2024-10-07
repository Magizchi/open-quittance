<script lang="ts">
	import Select from '$lib/components/atoms/Select.svelte';
	export let properties;
	export let tenants;

	let selectProperty: string;
	let selectTenant: string;
	let selectedDate: Date;
</script>

<div class="space-y-5">
	<Select label="Propriété :" name="property" bind:value={selectProperty} options={properties} />
	<Select label="Locataire :" name="tenant" bind:value={selectTenant} options={tenants} />
	<div class="flex flex-col space-y-2">
		<label class="flex flex-col text-hind text-slate-700" for="dateStart">Date :</label>
		<input
			type="date"
			id="dateStart"
			name="date"
			class="text-slate-700 font-hind"
			bind:value={selectedDate}
			min="2000-01-01"
		/>
	</div>
</div>
