<script lang="ts">
	import Input from '$lib/components/atoms/Input.svelte';
	export let id;
	export let defaultValues: any | null = {
		name: '',
		address: '',
		city: '',
		postalCode: '',
		rent: '',
		condo_fees: '',
		taxes: ''
	};
</script>

<div class="space-y-2">
	<Input
		name={`properties[${id}][name]`}
		bind:value={defaultValues['name']}
		placeholder="Nom du local"
	/>
	<Input
		name={`properties[${id}][address]`}
		bind:value={defaultValues['address']}
		placeholder="Adresse"
	/>
	<Input name={`properties[${id}][city]`} bind:value={defaultValues['city']} placeholder="Ville" />
	<Input
		name={`properties[${id}][postalCode]`}
		bind:value={defaultValues['postalCode']}
		placeholder="Code postal"
	/>
	<Input name={`properties[${id}][rent]`} bind:value={defaultValues['rent']} placeholder="Loyer" />
	<Input
		name={`properties[${id}][condo_fees]`}
		bind:value={defaultValues['condo_fees']}
		placeholder="Charge"
	/>
	<Input
		name={`properties[${id}][taxes]`}
		bind:value={defaultValues['taxes']}
		placeholder="Taxes"
	/>
</div>
