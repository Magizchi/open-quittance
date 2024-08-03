<script lang="ts">
	import Select from '$lib/components/atoms/Select.svelte';

	export let data;

	let selectedPeriod: any;
	let selectedRental: any;

	const month = [
		{ label: 'Janvier', value: 0 },
		{ label: 'Fev', value: 1 },
		{ label: 'Mars', value: 2 },
		{ label: 'Avril', value: 3 },
		{ label: 'Mai', value: 4 },
		{ label: 'Juin', value: 5 },
		{ label: 'Juillet', value: 6 },
		{ label: 'Aout', value: 7 },
		{ label: 'Septembre', value: 8 },
		{ label: 'Octobre', value: 9 },
		{ label: 'Novembre', value: 10 },
		{ label: 'Décembre', value: 11 }
	];

	let pdfBuffer: any;

	const handleSubmit = async () => {
		const response = await fetch('/api/quittance', {
			method: 'POST',
			body: JSON.stringify({ rental_id: selectedRental, month_id: selectedPeriod })
		});
	};
</script>

<!-- This is an example component -->
<section class="w-full">
	<form on:submit|preventDefault={handleSubmit}>
		<h1 class="text-5xl">Location en cours</h1>

		<Select label="Locations" name="rental" bind:value={selectedRental} options={data.rentalList} />

		<h1 class="text-5xl">Période</h1>

		<Select label="periode" name="periode" bind:value={selectedPeriod} options={month} />

		<button type="submit">VALIDER</button>
	</form>
</section>
