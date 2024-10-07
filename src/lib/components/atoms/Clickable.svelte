<script lang="ts">
	// Link
	export let href: string | null = null;
	export let current: boolean = false;

	// Button && Link
	export let primary: boolean = false;
	export let secondary: boolean = false;
	export let success: boolean = false;
	export let error: boolean = false;
	export let warning: boolean = false;
</script>

{#if href}
	<a
		{...$$restProps}
		class="flex p-2 text-white rounded-lg font-hind aria-[current=true]:bg-teal-500 aria-[current=true]:hover:bg-teal-600"
		class:bg-indigo-500={primary}
		class:hover:bg-indigo-600={primary}
		class:bg-slate-500={secondary}
		class:hover:bg-slate-600={secondary}
		class:bg-teal-500={current || success}
		class:hover:bg-teal-600={current || success}
		class:bg-rose-500={error}
		class:hover:bg-rose-600={error}
		class:bg-amber-500={warning}
		class:hover:bg-amber-600={warning}
		{href}
	>
		<slot />
	</a>
{:else}
	<button
		{...$$restProps}
		on:click
		class="w-full px-4 py-2 text-white rounded font-hind"
		class:bg-indigo-500={primary}
		class:hover:bg-indigo-600={primary}
		class:bg-slate-500={secondary}
		class:hover:bg-slate-600={secondary}
		class:bg-teal-500={success}
		class:hover:bg-teal-600={success}
		class:bg-rose-500={error}
		class:hover:bg-rose-600={error}
		class:bg-amber-500={warning}
		class:hover:bg-amber-600={warning}
	>
		<slot />
	</button>
{/if}
