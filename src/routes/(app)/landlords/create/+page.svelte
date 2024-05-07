<script>
	import Input from '$lib/components/atoms/Input.svelte';
	export let form;
	console.log('form', form);
</script>

<!-- This is an example component -->
<div class="max-w-2xl p-16 mx-auto">
	<form method="POST" class="space-y-10" action="?/create">
		<div class="grid gap-6 lg:grid-cols-2">
			<Input placeholder="Nom de l'entreprise" name="companyName" />
			<Input placeholder="Siret" name="siret" />
			<Input placeholder="Nom complet" name="fullName" />
			<Input placeholder="address" name="address" />
			<Input placeholder="postal code" name="postalCode" />
			<Input placeholder="city" name="city" />
		</div>
		<button
			type="submit"
			class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
		>
			Submit
		</button>
	</form>
</div>
