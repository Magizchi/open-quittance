<script lang="ts">
	import Input from '$lib/components/atoms/Input.svelte';
	export let defaultValues: {
		name: string;
		address: string;
		city: string;
		postalCode: string;
		rent: number | null;
		condo_fees: number | null;
		taxes: number | null;
	} = {
		name: '',
		address: '',
		city: '',
		postalCode: '',
		rent: null,
		condo_fees: null,
		taxes: null
	};
</script>

<div class="grid grid-cols-2 gap-3">
	<div class="col-span-2">
		<Input
			label="Adresse*"
			name={`address`}
			bind:value={defaultValues['address']}
			placeholder="1, Avenue de paris"
			required
		/>
	</div>

	<Input
		label="Ville*"
		name={`city`}
		bind:value={defaultValues['city']}
		placeholder="Ville"
		required
	/>
	<Input
		label="Code postal*"
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
		/>
	</div>
	<div class="col-span-2">
		<Input
			label="Loyer*"
			icon
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
			icon
			name={`condo_fees`}
			bind:value={defaultValues['condo_fees']}
			placeholder="250"
			type="number"
			min={0}
			required
		/>
	</div>
	<div class="col-span-2">
		<Input
			label="Taxes*"
			icon
			type="number"
			name={`taxes`}
			min={0}
			bind:value={defaultValues['taxes']}
			placeholder="100"
			required
		/>
	</div>
</div>
