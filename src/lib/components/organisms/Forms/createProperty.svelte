<script lang="ts">
	import Input from '$lib/components/atoms/Input.svelte';
	export let id;
</script>

<div class="space-y-2">
	<Input name={`properties[${id}][name]`} placeholder="Nom du local" />
	<Input name={`properties[${id}][address]`} placeholder="Adresse" />
	<Input name={`properties[${id}][city]`} placeholder="Ville" />
	<Input name={`properties[${id}][postalCode]`} placeholder="Code postal" />
	<Input name={`properties[${id}][rent]`} placeholder="Loyer" />
	<Input name={`properties[${id}][condo_fees]`} placeholder="Charge" />
	<Input name={`properties[${id}][taxes]`} placeholder="Taxes" />
</div>
