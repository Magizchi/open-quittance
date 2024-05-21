<script lang="ts">
	import Select from '$lib/components/atoms/Select.svelte';
	export let properties;
	export let tenants;

	let selectProperty: string;
	let selectTenant: string;
	let selectedDate: Date;
</script>

<Select name="property" bind:value={selectProperty} options={properties} />
<Select name="tenant" bind:value={selectTenant} options={tenants} />
<input type="date" id="start" name="date" bind:value={selectedDate} min="2000-01-01" />
