<script lang="ts">
	export let name: string;
</script>

<slot name="label" />
<div class="flex">
	{#if $$slots.CustomIcon}
		<span
			class="flex items-center justify-center h-10 text-2xl text-gray-400 border border-r-0 rounded-l-lg min-w-10 z-highest"
		>
			<slot name="CustomIcon" />
		</span>
	{/if}
	<input
		type="text"
		id={name}
		class={$$slots.CustomIcon
			? 'w-full pl-1 border border-gray-200 rounded-r-lg outline-none focus:ring-1 ring-blue-400'
			: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'}
		{name}
		{...$$restProps}
	/>
</div>
