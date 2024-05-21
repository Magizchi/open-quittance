<script lang="ts">
	export let name: string;
	export let className: string | null = null;
</script>

<slot name="label" />
<div class="flex">
	{#if $$slots.CustomIcon}
		<span
			class={'flex items-center justify-center h-10 text-2xl text-gray-400 border border-r-0 rounded-l-lg min-w-10 z-highest' +
				className}
		>
			<slot name="CustomIcon" />
		</span>
	{/if}
	<input
		type="text"
		id={name}
		class={$$slots.CustomIcon
			? 'w-full pl-1 border border-gray-200 rounded-r-lg outline-none focus:ring-1 ring-blue-400'
			: 'border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'}
		{name}
		{...$$restProps}
	/>
</div>
