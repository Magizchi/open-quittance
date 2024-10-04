<script lang="ts">
	export let href: string | null = null;
	export let primary: boolean = false;
	export let secondary: boolean = false;
	export let success: boolean = false;
	export let error: boolean = false;
	export let warning: boolean = false;
</script>

{#if href}
	<a
		{...$$restProps}
		class="flex p-2 font-bold text-white bg-gray-700 border-2 border-gray-200 flew-grow rounded-xl active:bg-red-500"
		{href}
	>
		<slot />
	</a>
{:else}
	<button
		{...$$restProps}
		on:click
		class="px-4 py-2 text-white rounded font-hind"
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
