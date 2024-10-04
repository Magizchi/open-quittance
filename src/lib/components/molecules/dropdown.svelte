<script lang="ts">
	import Clickable from '$lib/components/atoms/Clickable.svelte';
	export let label: string;
	export let data: any[];
	export let changeLandlord: (id: number) => void = () => {};
	let showList: boolean = false;

	console.log('label', label);
	$: if (label) {
		showList = false;
	}
	// const changeLandlord = async (landlordId: number | string) => {
	// 	const response = await fetch(`/api/landlords?landlordId=${landlordId}`).then((data) =>
	// 		data.json()
	// 	);

	// 	label = response.name;
	// 	showList = false;
	// };
</script>

<Clickable on:click={() => (showList = !showList)}>{label}</Clickable>
{#if showList}
	{#each data as option}
		<Clickable on:click={() => changeLandlord(option.id)}>{option.name}</Clickable>
		<!-- <Clickable href="/api/landlords?landlordId=${option.id}">{option.name}</Clickable> -->
	{/each}
	<Clickable href="/landlords/create">+ Ajouter un bailleur</Clickable>
{/if}
