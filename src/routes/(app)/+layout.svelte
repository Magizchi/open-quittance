<script lang="ts">
	import Bread from '$lib/components/bread/+page.svelte';
	// export let data;
</script>

<div class="flex">
	<aside class="min-h-screen p-4 text-white bg-gray-800 w-60">
		<div class="w-full px-2 py-4 mb-5">
			<h1>OpenQuittance</h1>
		</div>
		<nav>
			<ul class="space-y-3">
				<li class="w-full">
					<a href="/" class="flex p-2 hover:bg-gray-700">Accueil</a>
				</li>
				<li class="w-full space-y-2">
					<a href="/landlords" class="flex p-2 hover:bg-gray-700">Propriétaires</a>
				</li>
				<li>
					<a href="/tenants" class="flex p-2 hover:bg-gray-700">Locataires</a>
				</li>

				<li>
					<a href="/rentals" class="flex p-2 hover:bg-gray-700">Locations</a>
				</li>
				<li>
					<a href="/receipts" class="flex p-2 hover:bg-gray-700">Quittances</a>
				</li>
			</ul>
		</nav>
	</aside>
	<div class="flex flex-col w-full">
		<header class="w-full h-16 p-5 text-gray-700 bg-white shadow-sm body-font">
			<Bread />
		</header>
		<main>
			<slot />
		</main>
	</div>
</div>
