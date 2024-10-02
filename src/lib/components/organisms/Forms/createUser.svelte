<script>
	import Input from '$lib/components/atoms/Input.svelte';
</script>

<div class="grid gap-2 lg:grid-cols-2">
	<Input
		label="Nom de l'entreprise"
		placeholder="Nom de l'entreprise"
		name="name"
		required="required"
	/>
	<Input label="Siret" placeholder="Siret" name="siret" />
	<div class="col-span-2">
		<Input label="Adresse" placeholder="address" name="address" required="required" />
	</div>
	<Input label="Code Postal" placeholder="postal code" name="postalCode" required="required" />
	<Input label="Ville" placeholder="city" name="city" required="required" />
</div>
