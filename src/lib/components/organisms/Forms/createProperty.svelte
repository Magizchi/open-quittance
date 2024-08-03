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

<div class="grid grid-cols-2 gap-2">
	<div class="col-span-2">
		<Input
			label="Local"
			name={`properties[${id}][name]`}
			bind:value={defaultValues['name']}
			placeholder="local de bobigny"
		/>
	</div>
	<div class="col-span-2">
		<Input
			label="Adresse"
			name={`properties[${id}][address]`}
			bind:value={defaultValues['address']}
			placeholder="1, Avenue de paris"
		/>
	</div>
	<div class="col-span-">
		<Input
			name={`properties[${id}][city]`}
			bind:value={defaultValues['city']}
			placeholder="Ville"
		/>
	</div>
	<div class="col-span-1">
		<Input
			name={`properties[${id}][postalCode]`}
			bind:value={defaultValues['postalCode']}
			placeholder="Code postal"
		/>
	</div>
	<div class="col-span-2">
		<Input
			label="Loyer"
			name={`properties[${id}][rent]`}
			bind:value={defaultValues['rent']}
			placeholder="1100"
		/>
	</div>
	<div class="col-span-2">
		<Input
			label="Charges"
			name={`properties[${id}][condo_fees]`}
			bind:value={defaultValues['condo_fees']}
			placeholder="510"
		/>
	</div>
	<div class="col-span-2">
		<Input
			label="Taxes"
			name={`properties[${id}][taxes]`}
			bind:value={defaultValues['taxes']}
			placeholder="90"
		/>
	</div>
</div>
