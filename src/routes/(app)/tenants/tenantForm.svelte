<script lang="ts">
	import Input from '$lib/components/atoms/Input.svelte';
	export let defaultValues: {
		name: string;
		address: string;
		city: string;
		siret: string | null;
		postalCode: string;
	} = {
		name: '',
		address: '',
		city: '',
		siret: '',
		postalCode: ''
	};
</script>

<div class="grid gap-2 lg:grid-cols-2">
	<Input
		label="Nom du locataire*"
		placeholder="Entreprise ou particulier"
		name="name"
		required="required"
		bind:value={defaultValues['name']}
	/>
	<Input label="Siret" placeholder="Siret" name="siret" bind:value={defaultValues['siret']} />
	<div class="col-span-2">
		<Input
			label="Addresse* "
			placeholder="address"
			name="address"
			required="required"
			bind:value={defaultValues['address']}
		/>
	</div>
	<Input
		name="postalCode"
		label="Code Postal*"
		placeholder="postal code"
		required="required"
		type="number"
		bind:value={defaultValues['postalCode']}
	/>
	<Input
		name="city"
		label="Ville*"
		placeholder="ville"
		required="required"
		bind:value={defaultValues['city']}
	/>
</div>
