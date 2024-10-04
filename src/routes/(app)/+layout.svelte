<script lang="ts">
	import { page } from '$app/stores';
	import Clickable from '$lib/components/atoms/Clickable.svelte';
	import Balise from '$lib/components/atoms/notification/balise.svelte';
</script>

<div class="flex bg-slate-800">
	<aside class="min-h-screen p-4 space-y-8 font-hind w-60">
		<h1 class="text-2xl font-bold text-indigo-500 md:text-3xl font-hind">
			OPEN <span class="text-amber-500">QUITTANCE</span>
		</h1>
		<nav>
			<ul class="space-y-3">
				<li class="w-full">
					<Clickable href="/" aria-current={$page.url.pathname === '/'}>Quittances</Clickable>
				</li>
				<li class="w-full space-y-2">
					<Clickable href="/properties" aria-current={$page.url.pathname === '/properties'}
						>Propriétés</Clickable
					>
				</li>
				<li>
					<Clickable href="/tenants" aria-current={$page.url.pathname === '/tenants'}
						>Locataires</Clickable
					>
				</li>
				<li>
					<Clickable href="/rentals" aria-current={$page.url.pathname === '/rentals'}
						>Locations</Clickable
					>
				</li>
			</ul>
		</nav>
	</aside>
	<div class="flex flex-col w-full m-2 bg-slate-100 rounded-xl">
		<main class="relative mt-3">
			<Balise />
			<slot class="z-0" />
		</main>
	</div>
</div>
