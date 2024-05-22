<script lang="ts">
	import Bread from '$lib/components/bread/+page.svelte';
	import { page } from '$app/stores';

	// export let data;
</script>

<div class="flex bg-slate-300">
	<aside class="min-h-screen p-4 text-slate-600 w-60">
		<div class="w-full px-2 py-4 mb-5">
			<h1><a href="/">OpenQuittance</a></h1>
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
						href="/landlords"
						aria-current={$page.url.pathname === '/landlords'}
						class="flex p-2 hover:bg-slate-200 rounded-lg hover:text-slate-700 aria-[current=true]:bg-slate-200"
						>Propriétaires</a
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
						href="/receipts"
						aria-current={$page.url.pathname === '/receipts'}
						class="flex p-2 hover:bg-slate-200 rounded-lg hover:text-slate-700 aria-[current=true]:bg-slate-200"
						>Quittances</a
					>
				</li>
			</ul>
		</nav>
	</aside>
	<div class="flex flex-col w-full m-2 bg-white rounded-xl">
		<header class="w-full h-16 p-5 text-gray-700 bg-white body-font rounded-t-xl">
			<Bread />
		</header>
		<main>
			<slot />
		</main>
	</div>
</div>
