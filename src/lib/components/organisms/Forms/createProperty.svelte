<script lang="ts">
	import Input from '$lib/components/atoms/Input.svelte';
	import Select from '$lib/components/Select/+page.svelte';

	export let id;

	let selectedLandlord: any;
</script>

<div>
	<!-- <Select name="landlord" bind:value={selectedLandlord} options={data} /> -->
	<Input name={`properties[${id}][name]`} placeholder="Nom du local" value={`mega form ${id}`} />
	<Input name={`properties[${id}][address]`} placeholder="Adresse" value={`mega form ${id}`} />
	<Input name={`properties[${id}][city]`} placeholder="Ville" value="mega form" />
	<Input name={`properties[${id}][postalCode]`} placeholder="Code postal" value="5000" />
	<Input name={`properties[${id}][rent]`} placeholder="Loyer" value="500" />
	<Input name={`properties[${id}][condo_fees]`} placeholder="Charge" value="500" />
	<Input name={`properties[${id}][taxes]`} placeholder="Taxes" value="500" />
</div>
