<script>
	import Input from '$lib/components/atoms/Input.svelte';
</script>

<div class="grid gap-2 lg:grid-cols-2">
	<Input placeholder="Nom de l'entreprise" name="name" />
	<Input placeholder="Siret" name="siret" />
	<Input placeholder="address" name="address" />
	<Input placeholder="postal code" name="postalCode" />
	<Input placeholder="city" name="city" />
</div>
