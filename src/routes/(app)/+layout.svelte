<script lang="ts">
	import { page } from '$app/stores';
	import Clickable from '$lib/components/atoms/Clickable.svelte';
	import Balise from '$lib/components/atoms/notification/balise.svelte';
	import { ROUTES } from '$lib/constants/routes';
	import Toast from '$lib/components/atoms/notification/toast.svelte';
	export let data;
</script>

<div class="flex bg-slate-800">
	<aside class="min-h-screen p-4 space-y-8 font-hind w-60">
		<h1 class="text-2xl font-bold text-teal-500 md:text-3xl font-hind">
			<a href="/">
				OPEN <span class="text-amber-500">QUITTANCE</span>
			</a>
		</h1>
		{#if !data.needCreateLandlords}
			<nav class="flex flex-col justify-between h-5/6">
				<ul class="space-y-3 grow">
					<li class="w-full">
						<Clickable
							variant="menu"
							href={ROUTES.landing}
							aria-current={$page.url.pathname === `${ROUTES.landing}`}>Quittances</Clickable
						>
					</li>
					<li class="w-full space-y-2">
						<Clickable
							variant="menu"
							href={ROUTES.properties}
							aria-current={$page.url.pathname.includes(ROUTES.properties)}>Propriétés</Clickable
						>
					</li>
					<li>
						<Clickable
							variant="menu"
							href={ROUTES.tenants}
							aria-current={$page.url.pathname.includes(`${ROUTES.tenants}`)}>Locataires</Clickable
						>
					</li>
					<li>
						<Clickable
							variant="menu"
							href={ROUTES.rentals}
							aria-current={$page.url.pathname.includes(`${ROUTES.rentals}`)}>Locations</Clickable
						>
					</li>
				</ul>
				<ul class="space-y-3">
					<li>
						<Clickable
							variant="menu"
							href={ROUTES.settings}
							aria-current={$page.url.pathname.includes(`${ROUTES.settings}`)}>Paramètre</Clickable
						>
					</li>
					<li>
						<Clickable
							variant="menu"
							href={ROUTES.logout}
							aria-current={$page.url.pathname.includes(`${ROUTES.logout}`)}>Déconnexion</Clickable
						>
					</li>
				</ul>
			</nav>
		{/if}
	</aside>
	<div class="flex flex-col w-full m-2 bg-slate-100 rounded-xl">
		<main class="relative mt-5">
			<Balise />
			<Toast />
			<slot class="z-0" />
		</main>
	</div>
</div>
