<script>
	import Input from '../../../../components/Input/+page.svelte';
</script>

<!-- This is an example component -->
<div class="max-w-2xl p-16 mx-auto">
	<form>
		<div class="grid gap-6 mb-6 lg:grid-cols-2">
			<Input label="Company Name" placeholder="Name" name="name" />
			<Input label="Statut" placeholder="statut" name="statut" />
			<Input label="Postale Code" placeholder="postal code" name="postalCode" />
			<Input label="City" placeholder="city" name="city" />
		</div>
		<div class="mb-6">
			<label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
				>Adresse</label
			>
			<input
				type="email"
				id="email"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				placeholder="avenue de jean moulin"
				required
			/>
		</div>

		<button
			type="submit"
			class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>Submit</button
		>
	</form>
</div>
