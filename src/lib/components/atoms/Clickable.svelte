<script lang="ts">
	export let href: string | null = null;
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
		class="flex p-2 font-bold text-white bg-gray-700 border-2 border-gray-200 flew-grow rounded-xl active:bg-red-500"
	>
		<slot />
	</button>
{/if}
