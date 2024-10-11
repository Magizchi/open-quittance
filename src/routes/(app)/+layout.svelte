<script lang="ts">
	import { page } from '$app/stores';
	import Clickable from '$lib/components/atoms/Clickable.svelte';
	import Balise from '$lib/components/atoms/notification/balise.svelte';
	import { Routes } from '$lib/constants/routes';
	export let data;
</script>

<div class="flex bg-slate-800">
	<aside class="min-h-screen p-4 space-y-8 font-hind w-60">
		<h1 class="text-2xl font-bold text-indigo-500 md:text-3xl font-hind">
			OPEN <span class="text-amber-500">QUITTANCE</span>
		</h1>
		{#if !data.needCreateLandlords}
			<nav>
				<ul class="space-y-3">
					<li class="w-full">
						<Clickable
							href={Routes.landing}
							aria-current={$page.url.pathname === `${Routes.landing}`}>Quittances</Clickable
						>
					</li>
					<li class="w-full space-y-2">
						<Clickable
							href={Routes.properties}
							aria-current={$page.url.pathname.includes(Routes.properties)}>Propriétés</Clickable
						>
					</li>
					<li>
						<Clickable
							href={Routes.tenants}
							aria-current={$page.url.pathname.includes(`${Routes.tenants}`)}>Locataires</Clickable
						>
					</li>
					<li>
						<Clickable
							href={Routes.rentals}
							aria-current={$page.url.pathname.includes(`${Routes.rentals}`)}>Locations</Clickable
						>
					</li>
				</ul>
			</nav>
		{/if}
	</aside>
	<div class="flex flex-col w-full m-2 bg-slate-100 rounded-xl">
		<main class="relative mt-5">
			<Balise />
			<slot class="z-0" />
		</main>
	</div>
</div>
