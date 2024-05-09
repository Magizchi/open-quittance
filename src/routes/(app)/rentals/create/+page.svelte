<script lang="ts">
	import Select from '$lib/components/Select/+page.svelte';
	export let data;
	export let form;

	console.log('form', form);
	let selectProperty: string;
	let selectTenant: string;
	let selectedDate: Date;
</script>

<div class="max-w-2xl p-16 mx-auto">
	<form method="post" class="space-y-10" action="?/create">
		<Select name="property" bind:value={selectProperty} options={data.properties} />
		<Select name="tenant" bind:value={selectTenant} options={data.tenants} />
		<input type="date" id="start" name="trip-start" bind:value={selectedDate} min="2000-01-01" />
		<button type="submit">Submit</button>
	</form>
</div>
