<script lang="ts">
	import { invalidate, preloadData } from '$app/navigation';
	import { page } from '$app/stores';
	import Balise from '$lib/components/atoms/notification/balise.svelte';
	import Dropdown from '$lib/components/molecules/dropdown.svelte';
	import { redirect } from '@sveltejs/kit';
	export let data;

	let label = data.landlordName;
	const changeLandlord = async (landlordId: number | string) => {
		const response = await fetch(`/api/landlords?landlordId=${landlordId}`).then((data) =>
			data.json()
		);
		label = response.name;
	};

	$: chat = label;
</script>

<div class="flex bg-slate-300">
	<aside class="min-h-screen p-4 text-slate-600 w-60">
		{#if data.landlordId}
			<div class="w-full px-2 py-4 mb-5">
				<Dropdown data={data.landlords} label={chat} {changeLandlord} />
			</div>
			<nav>
				<ul class="space-y-3">
					<li class="w-full">
						<a
							href="/"
							aria-current={$page.url.pathname === '/'}
							class="flex p-2 hover:bg-slate-200 rounded-lg hover:text-slate-700 aria-[current=true]:bg-slate-200"
							>Accueil</a
						>
					</li>
					<li class="w-full space-y-2">
						<a
							href="/properties"
							aria-current={$page.url.pathname === '/properties'}
							class="flex p-2 hover:bg-slate-200 rounded-lg hover:text-slate-700 aria-[current=true]:bg-slate-200"
							>Propriétés</a
						>
					</li>
					<li>
						<a
							aria-current={$page.url.pathname === '/tenants'}
							href="/tenants"
							class="flex p-2 hover:bg-slate-200 rounded-lg hover:text-slate-700 aria-[current=true]:bg-slate-200"
							>Locataires</a
						>
					</li>

					<li>
						<a
							href="/rentals"
							aria-current={$page.url.pathname === '/rentals'}
							class="flex p-2 hover:bg-slate-200 rounded-lg hover:text-slate-700 aria-[current=true]:bg-slate-200"
							>Locations</a
						>
					</li>
					<li>
						<a
							aria-disabled="true"
							href="/receipts"
							aria-current={$page.url.pathname === '/receipts'}
							class="flex p-2 hover:bg-slate-200 rounded-lg hover:text-slate-700 aria-[current=true]:bg-slate-200"
							>Quittances</a
						>
					</li>
				</ul>
			</nav>
		{/if}
	</aside>
	<div class="flex flex-col w-full m-2 bg-slate-100 rounded-xl">
		{#key chat}
			<main class="relative mt-3">
				<Balise />
				<slot class="z-0" />
			</main>
		{/key}
	</div>
</div>
