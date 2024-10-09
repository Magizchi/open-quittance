<script lang="ts">
	import Input from '$lib/components/atoms/Input.svelte';
	export let defaultValues: any | null = {
		name: '',
		address: '',
		city: '',
		postalCode: 0,
		rent: 0,
		condo_fees: 0,
		taxes: 0
	};
</script>

<div class="grid grid-cols-2 gap-2">
	<div class="col-span-2">
		<Input
			label="Adresse*"
			name={`address`}
			bind:value={defaultValues['address']}
			placeholder="1, Avenue de paris"
			required
		/>
	</div>

	<Input name={`city`} bind:value={defaultValues['city']} placeholder="Ville" required />
	<Input
		name={`postalCode`}
		bind:value={defaultValues['postalCode']}
		placeholder="Code postal"
		type="number"
		required
	/>
	<div class="col-span-2">
		<Input
			label="Description"
			name={`name`}
			bind:value={defaultValues['name']}
			placeholder="Description"
			required
		/>
	</div>
	<div class="col-span-2">
		<Input
			label="Loyer*"
			name={`rent`}
			type="number"
			bind:value={defaultValues['rent']}
			placeholder="1100"
			min={0}
			required
		/>
	</div>
	<div class="col-span-2">
		<Input
			label="Charges*"
			name={`condo_fees`}
			bind:value={defaultValues['condo_fees']}
			placeholder="510"
			type="number"
			min={0}
			required
		/>
	</div>
	<div class="col-span-2">
		<Input
			label="Taxes*"
			type="number"
			name={`taxes`}
			min={0}
			bind:value={defaultValues['taxes']}
			placeholder="90"
			required
		/>
	</div>
</div>
