<script>
	import Input from '$lib/components/atoms/Input.svelte';
</script>

<!-- <form method="POST" class="space-y-10" action="?/create"> -->
<div class="grid gap-6 lg:grid-cols-2">
	<Input placeholder="Nom de l'entreprise" name="name" value="mega form" />
	<Input placeholder="Siret" name="siret" value="mega form" />
	<Input placeholder="address" name="address" value="mega form" />
	<Input placeholder="postal code" name="postalCode" value="012365" />
	<Input placeholder="city" name="city" value="mega form" />
</div>
<!-- <button
		type="submit"
		class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
	>
		Submit
	</button> -->
<!-- </form> -->
